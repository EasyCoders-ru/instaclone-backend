const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Хэллоу!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(() => console.log("Сервер запущен на http://localhost:4000/"));
