import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/MissingLetter';
export const getStaticProps = async () => await getGameSEO('MissingLetter');
