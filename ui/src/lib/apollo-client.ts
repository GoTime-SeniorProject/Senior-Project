import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_URL;

if (!GRAPHQL_ENDPOINT) {
  console.warn('VITE_GRAPHQL_URL is not set. GraphQL requests will fail.');
}

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
