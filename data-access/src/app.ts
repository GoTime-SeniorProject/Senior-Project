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

    newApp.use((req, _res, next) => {
      if (req.url.startsWith('/api/graphql')) {
        req.url = req.url.replace('/api/graphql', '') || '/';
      }
      next();
    });

    newApp.get('/health', (_req, res) => {
        res.json({ ok: true, envLoaded: Boolean(process.env.DB_HOST) });
    });

    newApp.get('/ping-db', async (_req, res) => {
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

    const context = async () => {
        console.log('[app] GraphQL context starting');
        const mongoDb = await getDb();
        console.log('[app] GraphQL context ready');
        return { mongoDb };
    };

    newApp.use('/graphql', expressMiddleware(server, { context }));
    newApp.use('/', expressMiddleware(server, { context }));

    app = newApp;
    return app;
}
