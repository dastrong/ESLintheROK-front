import { default as RedAndBlue } from 'games/RedAndBlue';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function RedAndBlueGame({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <RedAndBlue title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('RedAndBlue');
