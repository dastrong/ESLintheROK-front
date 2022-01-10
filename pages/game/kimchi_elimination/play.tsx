import { default as KimchiElimination } from 'games/KimchiElimination';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function KimchiEliminationGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <KimchiElimination title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('KimchiElimination');
