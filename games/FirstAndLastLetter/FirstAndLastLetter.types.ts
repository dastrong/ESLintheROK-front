import { Dispatch } from 'react';

export type Error = 'duplicate' | 'invalid' | '';

export type State = {
  data: string[];
  colors: string[];
  words: string[];
  oldWord: string;
  newWord: string;
  startingLetter: string;
  stage: number;
  error: Error;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | {
      type: 'New_Round';
      newStartingLetter: string;
      newColors: string[];
    }
  | { type: 'Update_Word'; newWord: string }
  | { type: 'Submit_And_Check' }
  | { type: 'Animation_Completed' };

export type GameStore = [State, Dispatch<Action>, boolean];
