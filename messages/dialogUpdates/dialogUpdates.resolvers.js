import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    dialogUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ dialogUpdates }, { id }) => {
          return dialogUpdates.dialogId === id;
        }
      ),
    },
  },
};
