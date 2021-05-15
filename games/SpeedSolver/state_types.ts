import { Dispatch } from 'react';

export type Stages = 1 | 2 | 3 | 4;
export type StageNames =
  | 'SHOW_LEVEL'
  | 'SHOW_READY'
  | 'ACTION'
  | 'SHOW_ANSWER_BOX'
  | 'SHOW_ANSWER_TEXT';

export type State = {
  data: string[];
  isVocab: boolean;
  gameData: string[];
  answer: string;
  level: number;
  stage: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; gameData: string[]; answer: string }
  | { type: 'Level_Change'; level: number }
  | { type: 'Stage_Change' };

export type GameStore = [State, Dispatch<Action>, boolean];
