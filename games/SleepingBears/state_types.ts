import { Dispatch } from 'react';

export type NumOfBoxes = 2 | 3 | 4;
export type Stages = 1 | 2 | 3 | 4;

export type State = {
  data: string[];
  isVocab: boolean;
  gameData: string[];
  answer: string;
  numOfBoxes: NumOfBoxes;
  stage: Stages;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; gameData: string[]; answer: string }
  | { type: 'Stage_Change' }
  | { type: 'Box_Num_Change'; numOfBoxes: NumOfBoxes };

export type GameStore = [State, Dispatch<Action>, boolean];
