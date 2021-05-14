import Notebook from 'games/Notebook';

const getHeaderTemplate = (editsLeft: number) =>
  `${editsLeft} Mistake${editsLeft > 1 ? 's' : ''}`;

export default function MissingLetter() {
  return <Notebook showBlank getHeaderTemplate={getHeaderTemplate} />;
}
