import shuffle from 'lodash.shuffle';
import type { State, Action, Stages, StageNames } from './WhatsMissing.types';

const numOfStages: StageNames['length'] = 4;

export const init = (data: string[]): State => ({
  data: shuffle(data),
  allText: [],
  missingText: [],
  otherText: [],
  numOfMissing: 1,
  numOfWords: 6,
  stage: 1,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'New_Round':
      return {
        ...state,
        data: action.data,
        allText: action.allText,
        missingText: action.missingText,
        otherText: action.otherText,
        stage: 1,
      };
    case 'Change_Stage':
      return {
        ...state,
        // if we're at the last stage, go back to the first
        stage: (state.stage === numOfStages ? 1 : state.stage + 1) as Stages,
      };
    case 'Change_NumOfMissing':
      return { ...state, numOfMissing: action.numOfMissing };
    case 'Change_NumOfWords':
      return { ...state, numOfWords: action.numOfWords };
    default:
      return state;
  }
};
