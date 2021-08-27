import React from 'react';
import Head from 'next/head';
import { useUser } from 'contexts/user';
import { defaultFonts } from 'lib/fonts';

const googleURL = 'https://fonts.googleapis.com/css2?family=';
const convertName = (name: string) => name.replace(' ', '+');

export default function FontLoader() {
  const { user } = useUser();

  return (
    <Head>
      {defaultFonts.map(font => (
        <link
          key={font.name}
          rel="stylesheet"
          href={`${googleURL}${convertName(font.name)}`}
        />
      ))}

      {user.extraFonts.map(font => (
        <link
          key={font.name}
          rel="stylesheet"
          href={`${googleURL}${convertName(font.name)}`}
        />
      ))}
    </Head>
  );
}
