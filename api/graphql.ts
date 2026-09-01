import serverless from 'serverless-http';
import app from '../data-access/dist/index.js';

export default serverless(app);
