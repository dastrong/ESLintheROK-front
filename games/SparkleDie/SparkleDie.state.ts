import shuffle from 'lodash.shuffle';
import type { State, Action } from './SparkleDie.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: false,
  text: '',
  timer: 15,
  timeRemaining: 15,
  isTimerRunning: false,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'Change_isVocab':
      return { ...state, isVocab: action.isVocab };
    case 'New_Round':
      return {
        ...state,
        data: action.data,
        text: action.text,
        timeRemaining: state.timer,
        isTimerRunning: true,
      };
    case 'Timer_Increase': {
      const maxTimer = 20;
      const newTimer = state.timer + 1;
      if (newTimer > maxTimer) return state;
      return { ...state, timer: newTimer, timeRemaining: newTimer };
    }
    case 'Timer_Decrease': {
      const minTimer = 5;
      const newTimer = state.timer - 1;
      if (newTimer < minTimer) return state;
      return { ...state, timer: newTimer, timeRemaining: newTimer };
    }
    case 'Timer_Pause':
      return {
        ...state,
        isTimerRunning: state.timeRemaining > 0 ? !state.isTimerRunning : false,
      };
    case 'Timer_Countdown':
      return {
        ...state,
        isTimerRunning: state.timeRemaining > 1,
        timeRemaining: state.timeRemaining - 1,
      };
    default:
      return state;
  }
};
