export type FontType = {
  _id?: string;
  name: string;
  fallback: string;
};

export const defaultFonts: FontType[] = [
  {
    name: 'Bree Serif',
    fallback: 'serif',
  },
  {
    name: 'Mali',
    fallback: 'cursive',
  },
  {
    name: 'Niramit',
    fallback: 'sans-serif',
  },
  {
    name: 'Poppins',
    fallback: 'sans-serif',
  },
  {
    name: 'Muli',
    fallback: 'sans-serif',
  },
  {
    name: 'Quicksand',
    fallback: 'sans-serif',
  },
];

export const getRandomFont = (fonts: FontType[]) => {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  return fonts[randomIndex];
};
