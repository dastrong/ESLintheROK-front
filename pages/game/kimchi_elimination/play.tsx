import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/KimchiElimination';
export const getStaticProps = async () => await getGameSEO('KimchiElimination');
