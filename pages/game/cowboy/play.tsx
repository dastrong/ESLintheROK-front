import { default as Cowboy } from 'games/Cowboy';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function CowboyGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Cowboy title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('Cowboy');
