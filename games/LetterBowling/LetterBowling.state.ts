import shuffle from 'lodash.shuffle';
import type { State, Action } from './LetterBowling.types';
import { darkenedColors } from 'lib/colors';

const maxRounds = 5;
const minRounds = 1;

export const init = (data: string[]): State => ({
  data: shuffle(data),
  colors: shuffle(darkenedColors),
  text: '',
  splitText: [],
  left: [],
  showAnswer: false,
  isGameOver: false,
  isBowling: false,
  rounds: 3,
  round: 1,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'New_Round':
      return {
        ...state,
        colors: shuffle(state.colors),
        showAnswer: false,
        isGameOver: false,
        isBowling: false,
        round: 1,
        data: action.data,
        text: action.text,
        left: action.left,
        splitText: action.splitText,
      };
    case 'Bowl_Start':
      return { ...state, isBowling: true };
    case 'Bowl_Next':
      return { ...state, isBowling: false, round: state.round + 1 };
    case 'Bowl_Done':
      return { ...state, isBowling: false, isGameOver: true };
    case 'Show_Answer':
      return { ...state, isGameOver: false, showAnswer: true };
    case 'Shuffle_Letters':
      return { ...state, splitText: shuffle(state.splitText) };
    case 'Rounds_Increase': {
      if (state.rounds === maxRounds) return state;
      return {
        ...state,
        showAnswer: false,
        isGameOver: false,
        isBowling: false,
        round: 1,
        rounds: state.rounds + 1,
      };
    }
    case 'Rounds_Decrease': {
      if (state.rounds === minRounds) return state;
      return {
        ...state,
        showAnswer: false,
        isGameOver: false,
        isBowling: false,
        round: 1,
        rounds: state.rounds - 1,
      };
    }
    default:
      return state;
  }
};
