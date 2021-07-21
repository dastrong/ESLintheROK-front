import path from 'path';
import fs from 'fs-extra';
import { GameConfig } from 'games/types';
import { getSingleGameConfig } from './getSingleGameConfig';

export const getAllGameConfigs = async () => {
  const gamesPath = path.join(process.cwd(), 'games/games.json');
  const { games } = await fs.readJson(gamesPath);

  const gameConfigs = await Promise.all<GameConfig>(
    games.map(async (gameName: string) => getSingleGameConfig(gameName))
  ).catch(err => {
    throw new Error(err);
  });

  return gameConfigs;
};
