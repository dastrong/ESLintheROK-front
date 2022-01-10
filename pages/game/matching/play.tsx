import { default as Matching } from 'games/Matching';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function MatchingGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Matching title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('Matching');
