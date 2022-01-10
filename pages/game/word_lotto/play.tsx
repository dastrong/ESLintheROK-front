import { default as WordLotto } from 'games/WordLotto';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function WordLottoGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <WordLotto title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('WordLotto');
