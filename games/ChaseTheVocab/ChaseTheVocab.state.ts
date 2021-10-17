import shuffle from 'lodash.shuffle';
import type { State, Action } from './ChaseTheVocab.types';
import { darkenedColors } from 'lib/colors';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  colors: shuffle(darkenedColors),
  gameData: [],
  round: 0,
  colorIndex: 0,
  clickedIDs: [],
  shuffDuration: 2000,
  shuffBuffer: 500,
  shuffRounds: 5,
  isAnimating: false,
  isShuffleDone: false,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'New_Round': {
      const { colors, colorIndex } = state;
      return {
        ...state,
        data: action.data,
        gameData: action.gameData,
        clickedIDs: [],
        isAnimating: false,
        isShuffleDone: false,
        round: 0,
        colorIndex: colorIndex < colors.length - 1 ? colorIndex + 1 : 0,
      };
    }
    case 'Add_Click_ID':
      // bail out of dispatch if already clicked
      if (!state.isShuffleDone) return state;
      if (state.clickedIDs.includes(action.id)) return state;
      return { ...state, clickedIDs: [...state.clickedIDs, action.id] };
    case 'Change_Settings':
      return {
        ...state,
        shuffBuffer: action.shuffBuffer,
        shuffDuration: action.shuffDuration,
        shuffRounds: action.shuffRounds,
      };
    case 'Change_Color': {
      const { colors, colorIndex } = state;
      return {
        ...state,
        colorIndex: colorIndex < colors.length - 1 ? colorIndex + 1 : 0,
      };
    }
    case 'Start_Animating':
      return { ...state, isAnimating: true };
    case 'Shuffle':
      return {
        ...state,
        gameData: shuffle(action.gameData),
        round: state.round + 1,
      };
    case 'Shuffle_Stop':
      return { ...state, isAnimating: false, isShuffleDone: true };
    default:
      return state;
  }
};
