import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeDialogs: protectedResolver(async (_, __, { loggedInUser }) =>
      client.dialog.findMany({
        where: { users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};
