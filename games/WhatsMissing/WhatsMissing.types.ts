import { Dispatch } from 'react';

export type NumOfMissing = 1 | 2 | 3;
export type NumOfWords = 4 | 5 | 6 | 7 | 8 | 9;
export type Stages = 1 | 2 | 3 | 4;
export type StageNames =
  | 'SHOW_INFO'
  | 'SHOW_ALL'
  | 'SHOW_SOME'
  | 'SHOW_MISSING';

export type State = {
  data: string[];
  allText: string[];
  missingText: string[];
  otherText: string[];
  numOfMissing: NumOfMissing;
  numOfWords: NumOfWords;
  stage: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | {
      type: 'New_Round';
      data: string[];
      allText: string[];
      missingText: string[];
      otherText: string[];
    }
  | { type: 'Change_Stage' }
  | { type: 'Change_NumOfMissing'; numOfMissing: NumOfMissing }
  | { type: 'Change_NumOfWords'; numOfWords: NumOfWords };

export type GameStore = [State, Dispatch<Action>, boolean];
