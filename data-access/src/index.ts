import { createGraphQLApp } from './apollo-app.js';

const app = createGraphQLApp();
export default (req: any, res: any) => app(req, res);
