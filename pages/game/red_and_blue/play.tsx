import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/RedAndBlue';
export const getStaticProps = async () => await getGameSEO('RedAndBlue');
