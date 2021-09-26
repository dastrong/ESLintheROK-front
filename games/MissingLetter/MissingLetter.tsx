import Notebook from 'games/_components/Notebook';
import GameWrapper from 'components/GameWrapper';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) =>
  `${editsLeft} Mistake${editsLeft > 1 ? 's' : ''}`;

export default function MissingLetter({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <Notebook showBlank getHeaderTemplate={getHeaderTemplate} title={title} />
    </GameWrapper>
  );
}
