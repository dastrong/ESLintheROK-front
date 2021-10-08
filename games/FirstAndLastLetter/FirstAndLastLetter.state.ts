import shuffle from 'lodash.shuffle';
import type { State, Action } from './FirstAndLastLetter.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true, // delete if there is only one data source
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    // delete if there is only one data source
    case 'Change_isVocab':
      return { ...state, isVocab: action.isVocab };
    case 'New_Round':
      return { ...state };
    default:
      return state;
  }
};
