import shuffle from 'lodash.shuffle';
import type { State, Action } from './state_types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  answer: '',
  guessed: new Set(),
  nWrong: 0,
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
        answer: action.answer,
        guessed: new Set(),
        nWrong: 0,
      };
    case 'Handle_Guess':
      return {
        ...state,
        guessed: new Set(action.guessed.add(action.letter)),
        nWrong: action.nWrong + (action.answer.includes(action.letter) ? 0 : 1),
      };
    default:
      return state;
  }
};
