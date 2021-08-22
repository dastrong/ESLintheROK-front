import { getGameSEO } from 'utils/getGameSEO';

export { default } from 'games/WhatsMissing';
export const getStaticProps = async () => await getGameSEO('WhatsMissing');
