import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/PubgBattleground';
export const getStaticProps = async () => await getGameSEO('PubgBattleground');
