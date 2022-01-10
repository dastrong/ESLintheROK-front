import Notebook from 'games/_components/Notebook';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) => `${editsLeft} Missing`;

export default function FixTheMistake({ title }: GameSEOProps) {
  return <Notebook getHeaderTemplate={getHeaderTemplate} title={title} />;
}
