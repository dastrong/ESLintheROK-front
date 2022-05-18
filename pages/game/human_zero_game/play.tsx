import { default as HumanZeroGame } from 'games/HumanZeroGame';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function HumanZeroGameGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <HumanZeroGame title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('HumanZeroGame');
