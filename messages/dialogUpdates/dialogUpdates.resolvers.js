import { withFilter } from "apollo-server-express";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    dialogUpdates: {
      subscribe: async (root, args, context, info) => {
        const dialog = client.dialog.findUnique({
          where: { id: args.id },
          select: { id: true },
        });
        if (!dialog) {
          throw new Error("Нет доступа к диалогу");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ dialogUpdates }, { id }) => {
            return dialogUpdates.dialogId === id;
          }
        )(root, args, context, info);
      },
    },
  },
};
