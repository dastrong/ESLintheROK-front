import shuffle from 'lodash.shuffle';
import type { State, Action, StageNames } from './SpeedSolver.types';

const numOfStages: StageNames['length'] = 5;

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  answer: '',
  level: 1,
  stage: 0,
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
    case 'Level_Change':
      return { ...state, level: action.level, stage: 0 };
    case 'Stage_Change': {
      const oldStage = state.stage;
      const newStage = oldStage === numOfStages - 1 ? 1 : oldStage + 1;
      return { ...state, stage: newStage };
    }
    default:
      return state;
  }
};
