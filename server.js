require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    "token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIzMTk2Nzg4fQ.GV0HUnymNjUdS3i4Z3jlCz5A-zjAYRKuBIqAfbEQ0Hg",
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`🚀 Сервер запущен на http://localhost:${PORT}/`));
