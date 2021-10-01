import React from 'react';
import Head from 'next/head';
import { useFont } from 'contexts/fonts';

const googleURL = 'https://fonts.googleapis.com/css2?family=';
const convertName = (name: string) => name.replace(' ', '+');

export default function FontLoader() {
  const { fonts } = useFont();

  return (
    <Head>
      {fonts.map(font => (
        <link
          key={font.name}
          rel="stylesheet"
          href={`${googleURL}${convertName(font.name)}`}
        />
      ))}
    </Head>
  );
}
