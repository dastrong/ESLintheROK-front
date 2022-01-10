import { default as HotPotato } from 'games/HotPotato';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function HotPotatoGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <HotPotato title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('HotPotato');
