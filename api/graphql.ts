import serverless from 'serverless-http';
import { createApp } from '../data-access/dist/app.js';

let handler: ReturnType<typeof serverless> | null = null;

export default async function (req: any, res: any) {
  if (!handler) {
    const app = await createApp();
    handler = serverless(app);
  }
  return handler(req, res);
}
