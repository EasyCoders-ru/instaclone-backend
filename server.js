import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({ schema });

server
  .listen()
  .then(() => console.log("Сервер запущен на http://localhost:4000/"));
