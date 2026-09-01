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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  const newApp = express();
  newApp.use(cors({ origin: true, credentials: true }));
  newApp.use(express.json());

  const context = async () => ({ mongoDb: await getDb() });

  newApp.use('/graphql', expressMiddleware(server, { context }));
  newApp.use('/', expressMiddleware(server, { context }));

  app = newApp;
  return app;
}
