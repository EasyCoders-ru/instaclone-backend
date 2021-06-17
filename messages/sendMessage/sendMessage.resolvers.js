import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, dialogId, userId }, { loggedInUser }) => {
        let dialog = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });
          if (!user) {
            return {
              ok: false,
              error: "Пользователь не найден",
            };
          }
          dialog = await client.dialog.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (dialogId) {
          dialog = await client.dialog.findUnique({
            where: { id: dialogId },
            select: { id: true },
          });
          if (!dialog) {
            return {
              ok: false,
              error: "Дилог не найден",
            };
          }
        }
        await client.message.create({
          data: {
            payload,
            dialog: {
              connect: {
                id: dialog.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
