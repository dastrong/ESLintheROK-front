import Notebook from 'games/_components/Notebook';
import GameWrapper from 'components/GameWrapper';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) => `${editsLeft} Missing`;

export default function FixTheMistake({ title, description }: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description}>
      <Notebook getHeaderTemplate={getHeaderTemplate} />
    </GameWrapper>
  );
}
