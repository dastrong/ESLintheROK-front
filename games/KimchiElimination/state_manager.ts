import shuffle from 'lodash.shuffle';
import type { State, Action } from './state_types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  text: '',
  showPic: false,
  isKimchi: true,
  kimchiFrequency: 50,
  showKimchiFrequency: false,
  isAnimating: false,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data), showPic: false };
    case 'New_Round':
      return {
        ...state,
        showPic: false,
        isAnimating: true,
        showKimchiFrequency: false,
        data: action.data,
        text: action.text,
        isKimchi: action.isKimchi,
      };
    case 'Show_Pic':
      return {
        ...state,
        showPic: true,
        isAnimating: true,
        showKimchiFrequency: false,
      };
    case 'Kimchi_Frequency_Increase': {
      if (state.kimchiFrequency > 98) return state;
      return {
        ...state,
        showKimchiFrequency: true,
        kimchiFrequency: state.kimchiFrequency + 1,
      };
    }
    case 'Kimchi_Frequency_Decrease': {
      if (state.kimchiFrequency < 2) return state;
      return {
        ...state,
        showKimchiFrequency: true,
        kimchiFrequency: state.kimchiFrequency - 1,
      };
    }
    case 'Hide_Kimchi_Frequency':
      return { ...state, showKimchiFrequency: false };
    case 'Animation_Done':
      return { ...state, isAnimating: false };
    default:
      return state;
  }
};
