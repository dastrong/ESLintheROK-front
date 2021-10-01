import Notebook from 'games/_components/Notebook';
import GameWrapper from 'components/GameWrapper';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) => `${editsLeft} Missing`;

export default function FixTheMistake({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Notebook getHeaderTemplate={getHeaderTemplate} title={title} />
    </GameWrapper>
  );
}
