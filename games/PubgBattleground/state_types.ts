import { Dispatch } from 'react';

export type Item = {
  name: string;
  points: string;
};

export type State = {
  data: string[];
  isVocab: boolean;
  gameData: string[];
  items: Item[];
  scaled: number;
  stage: number;
  countdown: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; gameData: string[]; items: Item[] }
  | { type: 'Countdown' }
  | { type: 'Countdown_Start' }
  | { type: 'Countdown_Setup' }
  | { type: 'Countdown_Stop' }
  | { type: 'Show_Items' };

export type GameStore = [State, Dispatch<Action>, boolean];
