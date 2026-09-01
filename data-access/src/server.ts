import app from './index.js';

const PORT = process.env.PORT ?? 7071;

app.listen(PORT, () => {
  console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
});
