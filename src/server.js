require("dotenv").config();
import express from "express";
import logger from "morgan";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  playground: false,
  introspection: false,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        protectedResolver,
      };
    } else {
      const { loggedInUser } = ctx.connection.context;
      return {
        loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("Вам нужно войти в аккаунт");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}/`);
});
