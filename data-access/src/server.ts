import { createGraphQLApp } from './apollo-app.js';

const PORT = process.env.PORT ?? 7071;

const app = createGraphQLApp();
app.listen(PORT, () => {
  console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
});
