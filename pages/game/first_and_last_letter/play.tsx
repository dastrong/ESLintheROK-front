import { default as FirstAndLastLetter } from 'games/FirstAndLastLetter';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function FirstAndLastLetterGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <FirstAndLastLetter title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () =>
  await getGameSEO('FirstAndLastLetter');
