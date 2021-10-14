import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/FirstAndLastLetter';
export const getStaticProps = async () =>
  await getGameSEO('FirstAndLastLetter');
