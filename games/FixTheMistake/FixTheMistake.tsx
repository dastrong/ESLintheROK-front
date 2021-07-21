import Notebook from 'games/_components/Notebook';

const getHeaderTemplate = (editsLeft: number) => `${editsLeft} Missing`;

export default function FixTheMistake() {
  return <Notebook getHeaderTemplate={getHeaderTemplate} />;
}
