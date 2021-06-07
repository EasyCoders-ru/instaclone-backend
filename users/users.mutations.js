import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // проверить есть ли уже пользователи с таким username и email в БД
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);
      // захешировать пароль
      // сохранить запись в БД и вернуть объект пользователя
      // если есть ошибки - показать пользователю
    },
  },
};
