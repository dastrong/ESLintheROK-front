import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean;
  gameData: string[];
  clickedIDs: number[];
  clickedID?: number;
  target: number[];
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | {
      type: 'New_Round';
      data: string[];
      gameData: string[];
      target: number[];
    }
  | { type: 'Card_Clicked'; id: number }
  | { type: 'Animate_Done' }
  | { type: 'xCount_Changed'; xCount: number };

export type GameStore = [State, Dispatch<Action>, boolean];
