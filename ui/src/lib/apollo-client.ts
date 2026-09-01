import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_URL ?? '/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
