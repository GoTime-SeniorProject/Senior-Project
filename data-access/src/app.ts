import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './graphql/schema/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import { getDb } from './db/mongo-client.js';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

let app: express.Express | null = null;

export async function createApp(): Promise<express.Express> {
    if (app) {
        return app;
    }

    console.log('[app] creating Apollo server');
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
    });

    await server.start();
    console.log('[app] Apollo server started');

    const newApp = express();
    newApp.use(cors());
    newApp.use(express.json());

    const context = async () => {
        console.log('[app] GraphQL context starting');
        const mongoDb = await getDb();
        console.log('[app] GraphQL context ready');
        return { mongoDb };
    };

    const apolloMiddleware = expressMiddleware(server, { context });

    const customGraphqlHandler: express.RequestHandler = async (req, res) => {
        try {
            console.log('[app] customGraphqlHandler', req.method, req.url);
            let query: string | undefined;
            let variables: Record<string, unknown> | undefined;
            let operationName: string | undefined;

            if (req.method === 'POST') {
                const body = req.body ?? {};
                query = body.query;
                variables = body.variables;
                operationName = body.operationName;
            } else if (req.method === 'GET') {
                query = req.query.query as string | undefined;
                variables = req.query.variables ? JSON.parse(req.query.variables as string) : undefined;
                operationName = req.query.operationName as string | undefined;
            }

            if (!query) {
                res.status(400).json({ errors: [{ message: 'Must provide query string.' }] });
                return;
            }

            const result = await server.executeOperation(
                { query, variables, operationName },
                { contextValue: await context() }
            );

            if (result.body.kind === 'single') {
                res.json(result.body.singleResult);
            } else {
                res.status(500).json({ errors: [{ message: 'Incremental responses not supported' }] });
            }
        } catch (err: any) {
            console.error('[app] customGraphqlHandler error:', err);
            res.status(500).json({ errors: [{ message: err.message ?? 'Internal server error' }] });
        }
    };

    const apiRouter = express.Router();

    apiRouter.get('/health', (_req, res) => {
        res.json({ ok: true, envLoaded: Boolean(process.env.DB_HOST) });
    });

    apiRouter.get('/test', (_req, res) => {
        res.json({ ok: true, message: 'plain GET works' });
    });

    apiRouter.post('/test', express.json(), (_req, res) => {
        res.json({ ok: true, message: 'plain POST works' });
    });

    apiRouter.get('/ping-db', async (_req, res) => {
        try {
            const mongoDb = await Promise.race([
                getDb(),
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error('DB connection timeout')), 6000)
                ),
            ]);
            const collections = await mongoDb.listCollections().toArray();
            res.json({ ok: true, collections: collections.map((c) => c.name) });
        } catch (err: any) {
            console.error('[ping-db] error:', err);
            res.status(500).json({ ok: false, error: err.message });
        }
    });

    apiRouter.use('/graphql', customGraphqlHandler);
    apiRouter.use('/graphql-old', apolloMiddleware);
    apiRouter.use('/', apolloMiddleware);

    newApp.use(apiRouter);
    newApp.use('/api/graphql', apiRouter);

    app = newApp;
    return app;
}
