import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/Cowboy';
export const getStaticProps = async () => await getGameSEO('Cowboy');
