import shuffle from 'lodash.shuffle';
import type { State, Action } from './Stars.types';
import { lightenedColors, darkenedColors } from 'lib/colors';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  colors: shuffle(lightenedColors),
  starColors: shuffle(darkenedColors),
  gameData: [],
  clickedIDs: [],
  stars: [],
  minimumStars: 0,
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
        starColors: shuffle(state.starColors),
        gameData: action.gameData,
        stars: action.stars,
        clickedIDs: [],
      };
    case 'Change_Min_Stars':
      return { ...state, minimumStars: action.minNumOfStars };
    case 'Card_Clicked':
      if (state.clickedIDs.includes(action.id)) return state;
      return { ...state, clickedIDs: [...state.clickedIDs, action.id] };
    default:
      return state;
  }
};
