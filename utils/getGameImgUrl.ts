export const getGameImgUrl = (gameTitle: string) => {
  const baseCloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const noSpacesTitle = gameTitle.replace(/\s/g, '');
  return `${baseCloudUrl}/Games/${noSpacesTitle}/GameCover.svg`;
};
