import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          skip: (page - 1) * 5,
          take: 5,
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};
