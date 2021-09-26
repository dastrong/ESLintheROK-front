import React from 'react';
import SeoWrapper from 'components/SeoWrapper';
import FontLoader from 'components/FontLoader';
import { GameSEOProps, GameKeyCut } from 'games/types';

import dynamic from 'next/dynamic';
const GameWrapperFullscreen = dynamic(() => import('./GameWrapperFullscreen'));
const GameWrapperTips = dynamic(() => import('./GameWrapperTips'));

type Props = GameSEOProps & {
  keyCuts: GameKeyCut[];
  children: React.ReactNode;
};

export default function GameWrapper({
  children,
  title,
  description,
  keyCuts,
}: Props) {
  return (
    <SeoWrapper title={title} description={description}>
      <FontLoader />
      <GameWrapperFullscreen />
      <GameWrapperTips title={title} keyCuts={keyCuts} />

      {children}
    </SeoWrapper>
  );
}
