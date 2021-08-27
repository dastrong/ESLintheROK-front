import shuffle from 'lodash.shuffle';
import type { State, Action } from './Notebook.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  editedText: [''],
  actualText: [''],
  maxEdits: 1,
  indexesTargeted: [],
  indexesShown: [],
  position: 'any',
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
        actualText: action.actualText,
        editedText: action.editedText,
        indexesTargeted: action.indexesTargeted,
        indexesShown: [],
      };
    case 'Change_Max':
      return { ...state, maxEdits: action.maxEdits };
    case 'Change_Position':
      return { ...state, position: action.position };
    case 'Show_Character': {
      const { indexesShown, indexesTargeted } = state;
      // all edited shown; return state
      if (indexesTargeted.length === indexesShown.length) return state;
      // check if we clicked a 'punch-hole'
      if (action.target) {
        // if that target is already clicked, return the same state
        return indexesShown.includes(action.target)
          ? state
          : { ...state, indexesShown: [...indexesShown, action.target] };
      }
      // find the next available target
      const nextTarget = indexesTargeted.find(
        targetIdx => !indexesShown.includes(targetIdx)
      );
      return { ...state, indexesShown: [...indexesShown, nextTarget] };
    }
    default:
      return state;
  }
};
