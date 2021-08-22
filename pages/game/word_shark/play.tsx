import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/WordShark';
export const getStaticProps = async () => await getGameSEO('WordShark');
