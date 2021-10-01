import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/__GameName__';
export const getStaticProps = async () => await getGameSEO('__GameName__');
