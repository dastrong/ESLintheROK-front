import shuffle from 'lodash.shuffle';
import type { State, Action } from './Cowboy.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  text: '',
  showReady: false,
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
        showReady: true,
        data: action.data,
        text: action.text,
      };
    case 'Show_Ready_False':
      return { ...state, showReady: false };
    default:
      return state;
  }
};
