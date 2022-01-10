import type { ImageLoaderProps } from 'next/image';

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

export const getGameImgUrl = (gameTitle: string): string => {
  const noSpacesTitle = gameTitle.replace(/\s/g, '');
  return `ESLintheROK/Games/${noSpacesTitle}/GameCover.png`;
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
  const bookFileName = `${grade}_${publisher.toUpperCase()}_${author.toUpperCase()}`;
  return `ESLintheROK/Books/${bookFileName}.jpg`;
};

export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // https://github.com/vercel/next.js/blob/canary/packages/next/client/image.tsx
  const params = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto'),
  ];
  const paramsString = params.join(',') + '/';
  return `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload/${paramsString}${src}`;
};
