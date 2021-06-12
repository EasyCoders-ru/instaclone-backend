import client from "../client";

export default {
  User: {
    totalFollowers: async ({ id }) =>
      await client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: async ({ id }) =>
      await client.user.count({ where: { followers: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};
