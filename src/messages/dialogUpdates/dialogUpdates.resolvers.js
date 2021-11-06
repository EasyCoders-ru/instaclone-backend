import { withFilter } from "apollo-server-express";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    dialogUpdates: {
      subscribe: async (root, args, context, info) => {
        const dialog = await client.dialog.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        if (!dialog) {
          throw new Error("Нет доступа к диалогу");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ dialogUpdates }, { id }, { loggedInUser }) => {
            if (dialogUpdates.dialogId === id) {
              const dialog = await client.dialog.findFirst({
                where: {
                  id,
                  users: { some: { id: loggedInUser.id } },
                },
                select: { id: true },
              });
              if (!dialog) {
                return false;
              }
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};
