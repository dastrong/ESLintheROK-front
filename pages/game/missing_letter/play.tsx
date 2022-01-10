import { default as MissingLetter } from 'games/MissingLetter';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function MissingLetterGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <MissingLetter title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('MissingLetter');
