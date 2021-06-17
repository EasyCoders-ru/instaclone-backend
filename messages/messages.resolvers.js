import client from "../client";

export default {
  Dialog: {
    users: ({ id }) => client.dialog.findUnique({ where: { id } }).users(),
    messages: ({ id }) => client.messages.findMany({ where: { dialogId: id } }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.messages.count({
        where: {
          read: false,
          dialogId: id,
          users: { id: { not: loggedInUser.id } },
        },
      });
    },
  },
};
