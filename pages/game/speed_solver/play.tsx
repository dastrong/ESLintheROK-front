import { default as SpeedSolver } from 'games/SpeedSolver';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function SpeedSolverGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <SpeedSolver title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('SpeedSolver');
