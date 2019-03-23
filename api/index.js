const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { ApolloServer, gql, PubSub } = require("apollo-server-express");
const { createServer } = require("http");
const path = require("path");

let eve = 0,
  alex = 0;

const typeDefs = gql`
  enum Host {
    ALEX
    EVE
  }

  type Results {
    alex: Int!
    eve: Int!
  }

  type Query {
    results: Results!
    totalVotes: Int!
  }

  type Mutation {
    vote(host: Host!): String!
    joinMailList(email: String!): String!
  }

  type Subscription {
    result: Results!
  }
`;

const resolvers = {
  Query: {
    results: () => ({ alex, eve }),
    totalVotes: () => alex + eve
  },
  Mutation: {
    vote(_, { host }, { superdelegate, pubsub }) {
      const inc = superdelegate ? 10 : 1;

      if (host === "EVE") eve += inc;
      else alex += inc;

      pubsub.publish("vote-recorded", { result: { alex, eve } });

      return "Thank you for voting!";
    },
    joinMailList() {
      return "Thank you for joining our mail list";
    }
  },
  Subscription: {
    result: {
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("vote-recorded")
    }
  }
};

const start = async port => {
  const pubsub = new PubSub();
  pubsub.ee.setMaxListeners(1000);

  const context = ({ req }) =>
    req && req.headers.superdelegate
      ? { superdelegate: req.headers.superdelegate === "true", pubsub }
      : { pubsub };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  const app = express();

  app.use(
    "/results",
    express.static(path.join(__dirname, "..", "client", "build"))
  );

  app.get("/reset", (req, res) => {
    alex = 0;
    eve = 0;
    res.redirect("/results");
  });

  server.applyMiddleware({ app });

  app.get(
    "/",
    expressPlayground({
      endpoint: "/graphql",
      subscriptionEndpoint: "/graphql"
    })
  );

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);
  httpServer.listen({ port }, () => {
    console.log(`GraphQL API running on port ${port}`);
  });
};

start(process.env.PORT || 4000);
