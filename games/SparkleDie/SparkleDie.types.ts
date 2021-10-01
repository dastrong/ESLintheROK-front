import { Dispatch } from 'react';

export type State = {
  data: string[];
  text: string;
  timer: number;
  timeRemaining: number;
  isTimerRunning: boolean;
};

export type Action =
  | { type: 'Set_Data'; data: string[] }
  | { type: 'New_Round'; data: string[]; text: string }
  | { type: 'Timer_Increase' }
  | { type: 'Timer_Decrease' }
  | { type: 'Timer_Pause' }
  | { type: 'Timer_Countdown' };

export type GameStore = [State, Dispatch<Action>, boolean];
