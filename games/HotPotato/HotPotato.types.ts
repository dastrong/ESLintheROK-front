import { Dispatch } from 'react';

export type NumOfText = 1 | 2 | 3;

export type State = {
  data: string[];
  isVocab: boolean;
  gameData: string[];
  numOfText: NumOfText;
  stage: 1 | 2 | 3;
  countdown: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; gameData: string[] }
  | { type: 'Countdown' }
  | { type: 'Countdown_Start' }
  | { type: 'Countdown_Stop' }
  | { type: 'Show_Text' }
  | { type: 'Change_NumOfText'; numOfText: NumOfText };

export type GameStore = [State, Dispatch<Action>, boolean];
