import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/SleepingBears';
export const getStaticProps = async () => await getGameSEO('SleepingBears');
