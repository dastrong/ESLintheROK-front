import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/HotPotato';
export const getStaticProps = async () => await getGameSEO('HotPotato');
