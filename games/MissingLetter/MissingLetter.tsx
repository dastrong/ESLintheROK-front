import Notebook from 'games/_components/Notebook';
import SeoWrapper from 'components/SeoWrapper';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) =>
  `${editsLeft} Mistake${editsLeft > 1 ? 's' : ''}`;

export default function MissingLetter({ title, description }: GameSEOProps) {
  return (
    <SeoWrapper title={title} description={description}>
      <Notebook showBlank getHeaderTemplate={getHeaderTemplate} />
    </SeoWrapper>
  );
}
