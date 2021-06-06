import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(() => console.log("Сервер запущен на http://localhost:4000/"));
