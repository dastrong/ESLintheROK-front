import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/WordLotto';
export const getStaticProps = async () => await getGameSEO('WordLotto');
