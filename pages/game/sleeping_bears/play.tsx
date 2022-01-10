import { default as SleepingBears } from 'games/SleepingBears';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function SleepingBearsGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <SleepingBears title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('SleepingBears');
