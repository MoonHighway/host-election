import { InMemoryCache, HttpLink, ApolloClient, split } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT,
  options: {
    reconnect: true,
    lazy: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

export default new ApolloClient({ cache, link });
