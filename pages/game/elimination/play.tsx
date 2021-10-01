import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/Elimination';
export const getStaticProps = async () => await getGameSEO('Elimination');
