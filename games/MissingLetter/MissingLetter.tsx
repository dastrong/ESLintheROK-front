import Notebook from 'games/_components/Notebook';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) =>
  `${editsLeft} Mistake${editsLeft > 1 ? 's' : ''}`;

export default function MissingLetter({ title }: GameSEOProps) {
  return (
    <Notebook showBlank getHeaderTemplate={getHeaderTemplate} title={title} />
  );
}
