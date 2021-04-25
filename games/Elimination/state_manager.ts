import shuffle from 'lodash.shuffle';
import type { State, Action } from './state_types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  Xs: [],
  xCount: 3,
  clickedIDs: [],
  clickedID: null,
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
        clickedIDs: [],
        clickedID: null,
        Xs: action.Xs,
      };
    case 'Card_Clicked': {
      if (state.clickedID !== null) return state;
      if (state.clickedIDs.includes(action.id)) return state;
      return { ...state, clickedID: action.id };
    }
    case 'Animate_Done':
      return {
        ...state,
        clickedID: null,
        clickedIDs: [...state.clickedIDs, state.clickedID],
      };
    case 'xCount_Changed': {
      if (!action.xCount || action.xCount > 5 || action.xCount === state.xCount)
        return state;
      return { ...state, xCount: action.xCount };
    }
    default:
      return state;
  }
};
