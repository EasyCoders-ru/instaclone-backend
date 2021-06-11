require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolvers } from "./users/users.utils";

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolvers,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`🚀 Сервер запущен на http://localhost:${PORT}/`));
