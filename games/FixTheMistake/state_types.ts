import { Dispatch } from 'react';

export type State = {
  data: string[];
  isVocab: boolean; // delete if there is only one data source
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean } // delete if there is only one data source
  | { type: 'New_Round' }; // add other variables here

export type GameStore = [State, Dispatch<Action>, boolean];
