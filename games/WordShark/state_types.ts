import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean;
  answer: string;
  guessed: Set<any>;
  nWrong: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; answer: string }
  | {
      type: 'Handle_Guess';
      answer: string;
      nWrong: number;
      letter: string;
      guessed: Set<any>;
    };

export type GameStore = [State, Dispatch<Action>, boolean];
