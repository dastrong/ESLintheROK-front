import { default as Nunchi } from 'games/Nunchi';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function NunchiGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Nunchi title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('Nunchi');
