import { Dispatch } from 'react';

export type MinimumStars = 0 | 1 | 2 | 3 | 4 | 5;

export type State = {
  data: string[];
  isVocab: boolean;
  gameData: string[];
  clickedIDs: number[];
  stars: number[];
  minimumStars: MinimumStars;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'Change_isVocab'; isVocab: boolean }
  | { type: 'New_Round'; data: string[]; gameData: string[]; stars: number[] }
  | { type: 'Change_Min_Stars'; minNumOfStars: MinimumStars }
  | { type: 'Card_Clicked'; id: number };

export type GameStore = [State, Dispatch<Action>, boolean];
