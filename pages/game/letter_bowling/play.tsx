import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/LetterBowling';
export const getStaticProps = async () => await getGameSEO('LetterBowling');
