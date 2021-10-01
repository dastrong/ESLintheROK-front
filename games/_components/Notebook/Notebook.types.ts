import { Dispatch } from 'react';

export type Position = 'any' | 'start' | 'middle' | 'end';

export type State = {
  data: string[];
  isVocab: boolean;
  editedText: string[];
  actualText: string[];
  maxEdits: number;
  indexesTargeted: number[];
  indexesShown: number[];
  position: Position;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | {
      type: 'New_Round';
      data: string[];
      actualText: string[];
      editedText: string[];
      indexesTargeted: number[];
    }
  | { type: 'Change_Max'; maxEdits: number }
  | { type: 'Change_Position'; position: Position }
  | { type: 'Show_Character'; target?: number };

export type GameStore = [State, Dispatch<Action>, boolean];
