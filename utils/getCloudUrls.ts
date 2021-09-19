type FileType = 'image' | 'video';

const imageExtensions = ['svg', 'png', 'jpg', 'webp', 'gif'];
const videoExtensions = ['mp3', 'wav'];

const getFileType = (file: string): FileType => {
  if (imageExtensions.some(type => file.endsWith(type))) return 'image';
  if (videoExtensions.some(type => file.endsWith(type))) return 'video';
  throw new Error("Wasn't able to handle that file extension");
};

export const getCloudImgBase = (
  transformations?: string,
  type: FileType = 'image'
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

export const getGameFileUrl = (gameFile: string, transformations?: string) => {
  const fileType = getFileType(gameFile);
  const baseUrl = getCloudImgBase(transformations, fileType);
  return `${baseUrl}/Games/${gameFile}`;
};

export const getBookCoverUrl = (
  grade: number,
  publisher: string,
  author: string
) => {
  const baseUrl = getCloudImgBase('/c_scale,f_auto,h_308,q_70,w_231');
  const bookFileName = `${grade}_${publisher.toUpperCase()}_${author.toUpperCase()}`;
  return `${baseUrl}/Books/${bookFileName}.jpg`;
};
