import Notebook from 'games/_components/Notebook';
import SeoWrapper from 'components/SeoWrapper';
import type { GameSEOProps } from 'games/types';

const getHeaderTemplate = (editsLeft: number) => `${editsLeft} Missing`;

export default function FixTheMistake({ title, description }: GameSEOProps) {
  return (
    <SeoWrapper title={title} description={description}>
      <Notebook getHeaderTemplate={getHeaderTemplate} />
    </SeoWrapper>
  );
}
