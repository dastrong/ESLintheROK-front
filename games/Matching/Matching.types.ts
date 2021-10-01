import { Dispatch } from 'react';

export type SettingsNum = 0 | 1 | 2 | 3 | 4;

export type State = {
  data: string[];
  gameData: string[];
  clicked: number[];
  matched: number[];
  settingsNum: SettingsNum;
  background: string;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | {
      type: 'New_Round';
      data: string[];
      gameData: string[];
      background: string;
    }
  | { type: 'Handle_Click'; id: number }
  | { type: 'Match_Yes' }
  | { type: 'Match_No' }
  | { type: 'Box_Setting_Increase' }
  | { type: 'Box_Setting_Decrease' };

export type GameStore = [State, Dispatch<Action>, boolean];
