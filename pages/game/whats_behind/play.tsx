import { default as WhatsBehind } from 'games/WhatsBehind';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function WhatsBehindGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <WhatsBehind title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('WhatsBehind');
