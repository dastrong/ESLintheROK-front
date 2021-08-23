export type BookTitleCreator = (
  grade: number,
  publisher: string,
  author: string
) => string;

export const createBookImgName: BookTitleCreator = (
  grade,
  publisher,
  author
) => {
  return `${grade}_${publisher.toUpperCase()}_${author.toUpperCase()}`;
};
