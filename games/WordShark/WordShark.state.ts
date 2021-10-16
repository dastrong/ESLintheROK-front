import shuffle from 'lodash.shuffle';
import type { State, Action } from './WordShark.types';

const specialChars = ".,?!':; ";

export const init = (data: string[]): State => ({
  data: shuffle(data),
  isVocab: true,
  answer: '',
  targeted: new Set(),
  guessed: new Set(),
  success: false,
  failed: false,
  showAnswer: false,
  numWrong: 0,
  maxWrong: 6,
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
        // remove special characters and get all targeted letters for this round
        targeted: new Set(
          action.answer
            .toLowerCase()
            .split('')
            .filter(letter => !specialChars.includes(letter))
            .join('')
        ),
        guessed: new Set(),
        numWrong: 0,
        showAnswer: false,
        success: false,
        failed: false,
      };
    case 'Handle_Guess': {
      const lowerCaseLetter = action.letter.toLowerCase();
      // if letter has been entered already, return the same state
      if (state.guessed.has(lowerCaseLetter)) return state;
      // if maximum tries has been reached, return the same state
      if (state.numWrong >= state.maxWrong) return state;
      // check if it was a good guess
      const goodGuess = state.targeted.has(lowerCaseLetter);
      const newGuessed = new Set(state.guessed.add(lowerCaseLetter));
      const newNumWrong = state.numWrong + (goodGuess ? 0 : 1);
      return {
        ...state,
        guessed: newGuessed,
        success: newGuessed.size - newNumWrong === state.targeted.size,
        failed: newNumWrong === state.maxWrong,
        numWrong: newNumWrong,
      };
    }
    case 'Show_Answer':
      return {
        ...state,
        showAnswer: true,
      };
    case 'Increase_Max_Wrong':
      return {
        ...state,
        maxWrong: state.maxWrong === 9 ? 9 : state.maxWrong + 1,
      };
    case 'Decrease_Max_Wrong':
      return {
        ...state,
        maxWrong: state.maxWrong === 1 ? 1 : state.maxWrong - 1,
      };
    case 'Set_Max_Wrong':
      return {
        ...state,
        maxWrong: action.maxWrong,
      };
    default:
      return state;
  }
};
