import shuffle from 'lodash.shuffle';
import type { State, Action, Stages } from './SleepingBears.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  answer: '',
  numOfBoxes: 4,
  stage: 1,
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
        answer: action.answer,
        stage: 1,
      };
    case 'Stage_Change':
      return { ...state, stage: (state.stage + 1) as Stages };
    case 'Box_Num_Change':
      return { ...state, numOfBoxes: action.numOfBoxes };
    default:
      return state;
  }
};
