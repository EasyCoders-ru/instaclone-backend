import client from "../client";

export default {
  Dialog: {
    users: ({ id }) => client.dialog.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: { dialogId: id },
        orderBy: { createdAt: "asc" },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          dialogId: id,
          user: { id: { not: loggedInUser.id } },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
