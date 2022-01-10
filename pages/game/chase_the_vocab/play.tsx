import { default as ChaseTheVocab } from 'games/ChaseTheVocab';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function ChaseTheVocabGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <ChaseTheVocab title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('ChaseTheVocab');
