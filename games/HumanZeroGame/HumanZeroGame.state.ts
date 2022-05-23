import shuffle from 'lodash.shuffle';
import type { State, Action } from './HumanZeroGame.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: false,
  text: '',
  stage: 0,
  groupSize: 4,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'Change_isVocab':
      return { ...state, isVocab: action.isVocab };
    case 'Group_Size_Change':
      return { ...state, groupSize: action.groupSize, stage: 0 };
    case 'New_Round':
      return {
        ...state,
        data: action.data,
        text: action.text,
        stage: 0,
      };
    case 'Show_Num':
      return { ...state, stage: 1 };
    default:
      return state;
  }
};
