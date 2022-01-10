import { default as FixTheMistake } from 'games/FixTheMistake';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function FixTheMistakeGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <FixTheMistake title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('FixTheMistake');
