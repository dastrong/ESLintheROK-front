import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/FixTheMistake';
export const getStaticProps = async () => await getGameSEO('FixTheMistake');
