import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/SparkleDie';
export const getStaticProps = async () => await getGameSEO('SparkleDie');
