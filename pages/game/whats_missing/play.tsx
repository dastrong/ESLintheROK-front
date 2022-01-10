import { default as WhatsMissing } from 'games/WhatsMissing';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function WhatsMissingGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <WhatsMissing title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('WhatsMissing');
