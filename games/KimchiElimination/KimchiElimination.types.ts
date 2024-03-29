import { Dispatch } from 'react';

export type State = {
  data: string[];
  text: string;
  showPic: boolean;
  isKimchi: boolean;
  kimchiFrequency: number;
  showKimchiFrequency: boolean;
  isAnimating: boolean;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'New_Round'; data: string[]; text: string; isKimchi: boolean }
  | { type: 'Show_Pic' }
  | { type: 'Kimchi_Frequency_Increase' }
  | { type: 'Kimchi_Frequency_Decrease' }
  | { type: 'Hide_Kimchi_Frequency' }
  | { type: 'Animation_Done' };

export type GameStore = [State, Dispatch<Action>, boolean];
