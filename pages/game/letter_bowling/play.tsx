import { default as LetterBowling } from 'games/LetterBowling';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function LetterBowlingGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <LetterBowling title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('LetterBowling');
