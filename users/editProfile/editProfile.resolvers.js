import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream();
  const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
  readStream.pipe(writeStream);
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }
  const editedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      avatar: "",
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  if (editedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Не получилось обновить профиль",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
