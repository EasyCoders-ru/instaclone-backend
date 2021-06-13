import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver((_, { file, caption }, { loggedInUser }) => {
      if (caption) {
        // Парсинг хештегов
        // Получить или создать хештег
      }
      // Сохранить фото с хештегами
      // Привязать фото к хештегам
    }),
  },
};
