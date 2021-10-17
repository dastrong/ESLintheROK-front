import { Dispatch } from 'react';

type GameData = {
  text: string;
  timeout: number;
  isWinner: boolean;
}[];

export type State = {
  data: string[];
  isVocab: boolean;
  colors: string[];
  gameData: GameData;
  isDone: boolean;
  isAnimating: boolean;
  maxCardDelay: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | {
      type: 'New_Round';
      data: string[];
      gameData: GameData;
      maxCardDelay: number;
    }
  | { type: 'Animation_Start' }
  | { type: 'Animation_Done' };

export type GameStore = [State, Dispatch<Action>, boolean];
