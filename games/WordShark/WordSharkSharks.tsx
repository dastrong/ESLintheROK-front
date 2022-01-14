/* eslint-disable @next/next/no-img-element */
import React, { CSSProperties } from 'react';
import { getGameFileUrl } from 'utils/getCloudUrls';

const SharkFinURL = getGameFileUrl('WordShark/Shark-Fin.svg');

const styles: CSSProperties = {
  position: 'absolute',
  height: 50,
};

export default function WordSharkSharks() {
  return (
    <>
      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{ ...styles, bottom: '2.5vh', right: 'calc(50% + 20vw)' }}
      />

      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{
          ...styles,
          bottom: '8.5vh',
          transform: 'scale(-0.8, 0.8)',
          right: 'calc(50% + 31vw)',
        }}
      />

      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{
          ...styles,
          bottom: '19vh',
          transform: 'scale(0.6, 0.6)',
          right: 'calc(50% + 22vw)',
        }}
      />

      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{
          ...styles,
          bottom: '14vh',
          transform: 'scale(-0.6, 0.6)',
          right: 'calc(50% + 16vw)',
        }}
      />

      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{ ...styles, bottom: '2.5vh', left: 'calc(50% + 22vw)' }}
      />

      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{
          ...styles,
          bottom: '13.5vh',
          transform: 'scale(-0.8, 0.8)',
          left: 'calc(50% + 30vw)',
        }}
      />

      <img
        src={SharkFinURL}
        alt="shark-fin"
        style={{
          ...styles,
          bottom: '17vh',
          transform: 'scale(0.6, 0.6)',
          left: 'calc(50% + 10vw)',
        }}
      />
    </>
  );
}
