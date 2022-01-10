import { default as Stars } from 'games/Stars';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function StarsGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Stars title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('Stars');
