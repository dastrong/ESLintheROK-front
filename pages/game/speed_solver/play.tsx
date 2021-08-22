import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/SpeedSolver';
export const getStaticProps = async () => await getGameSEO('SpeedSolver');
