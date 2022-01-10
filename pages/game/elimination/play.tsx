import { default as Elimination } from 'games/Elimination';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function EliminationGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Elimination title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('Elimination');
