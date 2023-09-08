
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URI}`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_AUTH_TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
