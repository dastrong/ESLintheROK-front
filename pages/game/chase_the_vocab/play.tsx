import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/ChaseTheVocab';
export const getStaticProps = async () => await getGameSEO('ChaseTheVocab');
