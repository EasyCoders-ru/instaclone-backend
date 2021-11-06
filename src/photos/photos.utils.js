export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[а-яА-Я]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
