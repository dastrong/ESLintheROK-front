import React from 'react';
import Head from 'next/head';
import { defaultFonts, FontType } from 'lib/fonts';

type Props = {
  extraFonts?: FontType[];
};

const googleURL = 'https://fonts.googleapis.com/css2?family=';
const convertName = (name: string) => name.replace(' ', '+');

export default function FontLoader({ extraFonts }: Props) {
  return (
    <Head>
      {defaultFonts.map(font => (
        <link
          key={font.name}
          rel="stylesheet"
          href={`${googleURL}${convertName(font.name)}`}
        />
      ))}

      {extraFonts?.map(font => (
        <link
          key={font.name}
          rel="stylesheet"
          href={`${googleURL}${convertName(font.name)}`}
        />
      ))}
    </Head>
  );
}
