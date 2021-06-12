import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Пользователь не найден",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
