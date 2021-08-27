import Notebook from 'games/_components/Notebook';
import GameWrapper from 'components/GameWrapper';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) =>
  `${editsLeft} Mistake${editsLeft > 1 ? 's' : ''}`;

export default function MissingLetter({ title, description }: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description}>
      <Notebook showBlank getHeaderTemplate={getHeaderTemplate} />
    </GameWrapper>
  );
}
