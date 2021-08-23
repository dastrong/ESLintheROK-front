import { createBookImgName, BookTitleCreator } from 'utils/createBookImgName';

export const getCloudImgBase = (
  transformations?: string,
  type: 'image' | 'video' = 'image'
) => {
  return (
    process.env.NEXT_PUBLIC_CLOUDINARY_URL +
    `/${type}` +
    '/upload' +
    `${transformations || ''}` +
    '/ESLintheROK'
  );
};

export const getGameImgUrl = (gameTitle: string) => {
  const baseUrl = getCloudImgBase();
  const noSpacesTitle = gameTitle.replace(/\s/g, '');
  return `${baseUrl}/Games/${noSpacesTitle}/GameCover.svg`;
};

export const getGameOgImgUrl = (gameTitle: string, transformations: string) => {
  const baseUrl = getCloudImgBase(transformations);
  const noSpacesTitle = gameTitle.replace(/\s/g, '');
  return `${baseUrl}/Games/${noSpacesTitle}/GameCover.png`;
};

export const getBookCoverUrl: BookTitleCreator = (...args) => {
  const baseUrl = getCloudImgBase('/c_scale,f_auto,h_300,q_70,w_231');
  const bookName = createBookImgName(...args);
  return `${baseUrl}/Books/${bookName}.jpg`;
};
