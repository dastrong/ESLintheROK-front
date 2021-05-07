import shuffle from 'lodash.shuffle';
import type { State, Action } from './state_types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  numOfText: 1,
  stage: 1,
  countdown: 0,
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
        gameData: action.gameData,
        stage: 1,
        countdown: 0,
      };
    case 'Countdown':
      return { ...state, countdown: state.countdown - 1 };
    case 'Countdown_Start':
      return { ...state, countdown: 3 };
    case 'Countdown_Stop':
      return { ...state, countdown: 0, stage: 2 };
    case 'Show_Text':
      return { ...state, stage: 3 };
    case 'Change_NumOfText':
      return { ...state, stage: 1, countdown: 0, numOfText: action.numOfText };
    default:
      return state;
  }
};
