import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean;
  answer: string;
  targeted: Set<string | null>;
  guessed: Set<string | null>;
  success: boolean;
  failed: boolean;
  numWrong: number;
  maxWrong: number;
  showAnswer: boolean;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; answer: string }
  | { type: 'Handle_Guess'; letter: string }
  | { type: 'Show_Answer' }
  | { type: 'Decrease_Max_Wrong' }
  | { type: 'Increase_Max_Wrong' }
  | { type: 'Set_Max_Wrong'; maxWrong: number };

export type GameStore = [State, Dispatch<Action>, boolean];
