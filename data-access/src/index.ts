import express from 'express';
import { createGraphQLApp } from './apollo-app.js';

const app = createGraphQLApp();
const server = express().use(app);
export default (req: any, res: any) => server(req, res);
