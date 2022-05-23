import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean;
  text: string;
  stage: number;
  groupSize: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'Group_Size_Change'; groupSize: number }
  | { type: 'New_Round'; data: string[]; text: string }
  | { type: 'Show_Num' };

export type GameStore = [State, Dispatch<Action>, boolean];
