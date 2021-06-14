import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const ok = await client.photo.findUnique({ where: { id } });
      if (!ok) {
        return {
          ok: false,
          error: "Фотография не найдена",
        };
      }
      const like_where = {
        photoId_userId: {
          photoId: id,
          userId: loggedInUser.id,
        },
      };
      const like = await client.like.findUnique({
        where: like_where,
      });
      if (like) {
        await client.like.delete({
          where: like_where,
        });
      } else {
        await client.like.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id } },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
