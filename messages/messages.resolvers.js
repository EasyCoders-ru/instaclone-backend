import client from "../client";

export default {
  Dialog: {
    users: ({ id }) => client.dialog.findUnique({ where: { id } }).users(),
    messages: ({ id }) => client.messages.findMany({ where: { dialogId: id } }),
    unreadTotal: () => 0,
  },
};
