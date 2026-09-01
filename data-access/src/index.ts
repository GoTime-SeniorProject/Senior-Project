import express from 'express';
import serverless from 'serverless-http';
import { createApp } from './apollo-app.js';

let handler: ReturnType<typeof serverless> | null = null;

export default async function graphqlHandler(req: any, res: any) {
  try {
    if (!handler) {
      console.log('[index] initializing handler');
      const app = await createApp();
      console.log('[index] app created');
      handler = serverless(app);
      console.log('[index] serverless handler created');
    }
    return handler(req, res);
  } catch (err: any) {
    console.error('[index] init error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err?.message ?? 'Internal server error' });
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  createApp().then((app) => {
    const port = process.env.PORT ?? 7071;
    app.listen(port, () => {
      console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
    });
  });
}
