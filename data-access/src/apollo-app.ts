import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import express from 'express';
import cors from 'cors';
import { typeDefs } from './graphql/schema/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import { getDb } from './db/mongo-client.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env.local');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: envPath });
}

export type GraphQLContext = {
  mongoDb: Awaited<ReturnType<typeof getDb>>;
};

let server: ApolloServer<GraphQLContext> | null = null;

export async function createApolloServer(): Promise<ApolloServer<GraphQLContext>> {
  if (server) {
    return server;
  }

  const newServer = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await newServer.start();
  server = newServer;
  return server;
}

export async function createContext(): Promise<GraphQLContext> {
  return { mongoDb: await getDb() };
}

function parseGraphQLRequest(req: express.Request) {
  if (req.method === 'POST') {
    return req.body ?? {};
  }

  if (req.method === 'GET') {
    const { query, variables, operationName } = req.query;
    return {
      query: typeof query === 'string' ? query : undefined,
      variables: typeof variables === 'string' ? JSON.parse(variables) : undefined,
      operationName: typeof operationName === 'string' ? operationName : undefined,
    };
  }

  return {};
}

const graphqlHandler: express.RequestHandler = async (req, res) => {
  try {
    const { query, variables, operationName } = parseGraphQLRequest(req);

    if (!query || typeof query !== 'string') {
      res.status(400).json({ errors: [{ message: 'Must provide query string.' }] });
      return;
    }

    const apolloServer = await createApolloServer();
    const result = await apolloServer.executeOperation(
      { query, variables, operationName },
      { contextValue: await createContext() }
    );

    if (result.body.kind === 'single') {
      res.status(200).json(result.body.singleResult);
    } else {
      res.status(500).json({ errors: [{ message: 'Incremental responses are not supported.' }] });
    }
  } catch (err: any) {
    console.error('[graphqlHandler] error:', err);
    if (!res.headersSent) {
      res.status(500).json({ errors: [{ message: err.message ?? 'Internal server error' }] });
    }
  }
};

export function createGraphQLApp(): express.Express {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());

  app.get('/graphql', async (_req, res) => {
    const apolloServer = await createApolloServer();
    const landingPage = ApolloServerPluginLandingPageLocalDefault();
    const page = await (landingPage as any).renderLandingPage();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(page.html);
  });

  app.use('/graphql', graphqlHandler);
  app.use('/', graphqlHandler);
  return app;
}
