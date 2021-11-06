import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Комментарий не найден",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Нет доступа",
          };
        } else {
          await client.comment.update({ where: { id }, data: { payload } });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
