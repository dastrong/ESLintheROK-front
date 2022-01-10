import React from 'react';
import { useStore } from 'contexts/store';
import { GameSEOProps, GameKeyCut } from 'games/types';

import SeoWrapper from 'components/SeoWrapper';
import FontLoader from 'components/FontLoader';
import GameWrapperDataNotice from './GameWrapperDataNotice';

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
  const { isDataReady } = useStore();

  // if there's no data set then we'll set a loading to true...
  // ... so we can wait and see if localStorage has a pastLesson
  const [loading, setLoading] = React.useState(!isDataReady);

  React.useEffect(() => {
    if (isDataReady) setLoading(false);
  }, [isDataReady]);

  return (
    <SeoWrapper noindex title={title} description={description}>
      <FontLoader />
      <GameWrapperFullscreen />
      {!isDataReady || loading ? <GameWrapperDataNotice /> : children}
      <GameWrapperTips title={title} keyCuts={keyCuts} />
    </SeoWrapper>
  );
}
