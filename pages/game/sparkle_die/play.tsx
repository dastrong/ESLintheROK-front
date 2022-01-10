import { default as SparkleDie } from 'games/SparkleDie';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function SparkleDieGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <SparkleDie title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('SparkleDie');
