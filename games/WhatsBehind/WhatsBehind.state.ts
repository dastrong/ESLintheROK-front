import shuffle from 'lodash.shuffle';
import type { State, Action } from './WhatsBehind.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  clickedIDs: [],
  clickedID: null,
  target: [],
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
        target: action.target,
      };
    case 'Card_Clicked': {
      if (state.clickedID !== null || state.clickedIDs.includes(action.id))
        return state;
      return { ...state, clickedID: action.id };
    }
    case 'Animate_Done':
      return {
        ...state,
        clickedID: null,
        clickedIDs: [...state.clickedIDs, state.clickedID],
      };
    default:
      return state;
  }
};
