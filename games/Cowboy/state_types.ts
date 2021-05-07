import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean;
  text: string;
  showReady: boolean;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; text: string }
  | { type: 'Show_Ready_False' };

export type GameStore = [State, Dispatch<Action>, boolean];
