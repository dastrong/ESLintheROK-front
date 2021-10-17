import shuffle from 'lodash.shuffle';
import type { State, Action } from './WordLotto.types';
import { lightenedColors } from 'lib/colors';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  colors: shuffle(lightenedColors),
  gameData: [],
  isDone: false,
  isAnimating: false,
  maxCardDelay: 0,
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
        colors: shuffle(state.colors),
        gameData: action.gameData,
        maxCardDelay: action.maxCardDelay,
        isDone: false,
        isAnimating: false,
      };
    case 'Animation_Start':
      return { ...state, isAnimating: true };
    case 'Animation_Done':
      return { ...state, isDone: true };
    default:
      return state;
  }
};
