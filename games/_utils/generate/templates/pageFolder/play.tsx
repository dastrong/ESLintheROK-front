import { default as __GameName__ } from 'games/__GameName__';
import { GameSEOProps } from 'games/types';
import { getGameSEO } from 'utils/getGameSEO';
import GameWrapper from 'components/GameWrapper';

export default function __GameName__Game({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <__GameName__ title={title} />
    </GameWrapper>
  );
}

export const getStaticProps = async () => await getGameSEO('__GameName__');
