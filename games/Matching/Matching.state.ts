import shuffle from 'lodash.shuffle';
import type { State, Action, SettingsNum } from './Matching.types';

export const init = (data: string[]): State => ({
  data: shuffle(data),
  gameData: [],
  clicked: [],
  matched: [],
  settingsNum: 2,
  background: '',
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Data':
      return { ...state, data: shuffle(action.data) };
    case 'New_Round':
      return {
        ...state,
        data: action.data,
        gameData: action.gameData,
        background: action.background,
        clicked: [],
        matched: [],
      };
    case 'Handle_Click': {
      const { clicked } = state;
      // if we've already clicked this card or two cards have been clicked, return our same state
      if (clicked.includes(action.id) || clicked.length === 2) return state;
      // new card was clicked, add it to clicked array
      return { ...state, clicked: [action.id, ...clicked] };
    }
    case 'Match_Yes':
      return {
        ...state,
        clicked: [],
        matched: [...state.matched, ...state.clicked],
      };
    case 'Match_No':
      return { ...state, clicked: [] };
    case 'Box_Setting_Increase':
      if (state.settingsNum >= 4) return state;
      return { ...state, settingsNum: (state.settingsNum + 1) as SettingsNum };
    case 'Box_Setting_Decrease':
      if (state.settingsNum <= 0) return state;
      return { ...state, settingsNum: (state.settingsNum - 1) as SettingsNum };
    default:
      return state;
  }
};
