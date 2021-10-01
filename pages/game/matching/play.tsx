import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/Matching';
export const getStaticProps = async () => await getGameSEO('Matching');
