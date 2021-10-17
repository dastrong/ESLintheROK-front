import { Dispatch } from 'react';

export type State = {
  data: string[];
  colors: string[];
  text: string;
  splitText: string[];
  left: number[];
  showAnswer: boolean;
  isGameOver: boolean;
  isBowling: boolean;
  round: number;
  rounds: number;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | {
      type: 'New_Round';
      data: string[];
      text: string;
      left: number[];
      splitText: string[];
    }
  | { type: 'Bowl_Start' }
  | { type: 'Bowl_Next' }
  | { type: 'Bowl_Done' }
  | { type: 'Show_Answer' }
  | { type: 'Shuffle_Letters' }
  | { type: 'Rounds_Increase' }
  | { type: 'Rounds_Decrease' };

export type GameStore = [State, Dispatch<Action>, boolean];
