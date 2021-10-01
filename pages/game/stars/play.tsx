import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/Stars';
export const getStaticProps = async () => await getGameSEO('Stars');
