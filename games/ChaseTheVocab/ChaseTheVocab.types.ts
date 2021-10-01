import { Dispatch } from 'react';

export type GameData = {
  text: string;
  id: number;
}[];

export type State = {
  data: string[];
  gameData: GameData;
  round: number;
  color: number;
  clickedIDs: number[];
  shuffDuration: number;
  shuffBuffer: number;
  shuffRounds: number;
  isAnimating: boolean;
  isShuffleDone: boolean;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'New_Round'; data: string[]; gameData: GameData }
  | { type: 'Add_Click_ID'; id: number }
  | {
      type: 'Change_Settings';
      shuffBuffer: number;
      shuffDuration: number;
      shuffRounds: number;
    }
  | { type: 'Change_Color'; color: number }
  | { type: 'Start_Animating' }
  | { type: 'Shuffle'; gameData: GameData }
  | { type: 'Shuffle_Stop' };

export type GameStore = [State, Dispatch<Action>, boolean];
