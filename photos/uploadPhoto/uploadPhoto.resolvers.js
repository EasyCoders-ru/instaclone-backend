import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver((_, { file, caption }, { loggedInUser }) => {
      if (caption) {
        const hashtags = caption.match(/#[а-яА-Я]+/g);
      }
      client.photo.create({
        data: {
          file,
          caption,
          hashtags: {
            connectOrCreate: [
              {
                where: {
                  hashtag: "#еду",
                },
                create: {
                  hashtag: "#eду",
                },
              },
            ],
          },
        },
      });
    }),
  },
};
