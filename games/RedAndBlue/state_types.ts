import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean;
  red: string;
  blue: string;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; red: string; blue: string };

export type GameStore = [State, Dispatch<Action>, boolean];
