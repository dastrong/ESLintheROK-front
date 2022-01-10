import { default as PubgBattleground } from 'games/PubgBattleground';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function PubgBattlegroundGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <PubgBattleground title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('PubgBattleground');
