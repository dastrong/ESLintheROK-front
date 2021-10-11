import shuffle from 'lodash.shuffle';
import type { State, Action } from './FirstAndLastLetter.types';
import { lighten } from 'color2k';
import { colors } from 'lib/colors';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  colors: shuffle(colors.map(color => lighten(color, 0.3))),
  words: [],
  oldWord: '',
  newWord: '',
  startingLetter: '',
  error: '',
  stage: 0,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'New_Round':
      return {
        ...state,
        error: '',
        oldWord: state.error ? '' : state.newWord,
        newWord: '',
        startingLetter: action.newStartingLetter,
        colors: action.newColors,
        stage: 0,
      };
    case 'Update_Word':
      return { ...state, newWord: action.newWord };
    case 'Submit_And_Check': {
      const { oldWord, newWord, words, startingLetter } = state;
      const lastLetter = oldWord[oldWord.length - 1] || startingLetter;
      const isValid = lastLetter === newWord[0];
      const isDuplicate = state.words.includes(newWord);
      return {
        ...state,
        error: isDuplicate ? 'duplicate' : !isValid ? 'invalid' : '',
        stage: isDuplicate || !isValid ? 0 : 1,
        words: isDuplicate || !isValid ? words : [...words, newWord],
      };
    }
    case 'Animation_Completed':
      return { ...state, stage: 2, oldWord: state.newWord };
    default:
      return state;
  }
};
