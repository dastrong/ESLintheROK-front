import { default as WordShark } from 'games/WordShark';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function WordSharkGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <WordShark title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('WordShark');
