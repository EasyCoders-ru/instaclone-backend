import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeDialog: protectedResolver(async (_, { id }, { loggedInUser }) =>
      client.dialog.findFirst({
        where: { id, users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};
