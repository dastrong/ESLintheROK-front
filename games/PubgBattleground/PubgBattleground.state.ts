import shuffle from 'lodash.shuffle';
import type { State, Action } from './PubgBattleground.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  gameData: [],
  items: [],
  isVocab: true,
  scaled: 0,
  stage: 0,
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
        items: action.items,
        stage: 0,
        countdown: 0,
      };
    case 'Countdown':
      return { ...state, countdown: state.countdown - 1 };
    case 'Countdown_Start':
      return { ...state, countdown: 10 };
    case 'Countdown_Setup':
      return { ...state, stage: 1 };
    case 'Countdown_Stop':
      return { ...state, stage: 2, countdown: 0, scaled: state.scaled + 0.03 };
    case 'Show_Items':
      return { ...state, stage: 3 };
    default:
      return state;
  }
};
