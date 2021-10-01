import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/Nunchi';
export const getStaticProps = async () => await getGameSEO('Nunchi');
