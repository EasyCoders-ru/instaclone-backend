import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              bio: true,
              avatar: true,
            },
          },
        },
      });
      return likes.map((like) => like.user);
    },
  },
};
