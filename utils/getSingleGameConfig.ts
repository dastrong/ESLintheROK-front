import { GameConfig } from 'games/types';

export const getSingleGameConfig = async (gameFileName: string) => {
  return await import(`games/${gameFileName}/${gameFileName}.config`).then(
    ({ config }: { config: GameConfig }) => config
  );
};
