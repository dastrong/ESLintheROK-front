const baseCloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const folder = '/ESLintheROK';

export const getGameImgUrl = (gameTitle: string) => {
  const noSpacesTitle = gameTitle.replace(/\s/g, '');
  return `${baseCloudUrl}${folder}/Games/${noSpacesTitle}/GameCover.svg`;
};

export const getGameOgImgUrl = (gameTitle: string, transformations: string) => {
  const noSpacesTitle = gameTitle.replace(/\s/g, '');
  return `${baseCloudUrl}${transformations}${folder}/Games/${noSpacesTitle}/GameCover.png`;
};
