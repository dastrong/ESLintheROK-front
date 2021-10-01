import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/WhatsBehind';
export const getStaticProps = async () => await getGameSEO('WhatsBehind');
