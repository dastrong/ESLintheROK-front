import type { State, Action } from './PastLessons.types';

const initialDelete = {
  deleteTitle: null as string,
  deleteId: null as string,
};

const initialShare = {
  shareTitle: null as string,
  shareId: null as string,
};

export const initialState: State = {
  showing: 'list',
  selected: [],
  viewingId: null,
  deleteTitle: null,
  deleteId: null,
  shareTitle: null,
  shareId: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Showing':
      return {
        ...state,
        showing: action.showing,
        viewingId: null,
        ...initialDelete,
        ...initialShare,
      };
    case 'View_Lesson':
      return {
        ...state,
        showing: 'view',
        viewingId: action.id,
        ...initialDelete,
        ...initialShare,
      };
    case 'Edit_Lesson':
      return {
        ...state,
        showing: 'edit',
        viewingId: action.id,
        ...initialDelete,
        ...initialShare,
      };
    case 'Delete_Lesson':
      return {
        ...state,
        deleteId: action.id,
        deleteTitle: action.title,
        ...initialShare,
      };
    case 'Share_Lesson':
      return {
        ...state,
        shareId: action.id,
        shareTitle: action.title,
        ...initialDelete,
      };
    case 'Reset_Delete_Share':
      return {
        ...state,
        ...initialDelete,
        ...initialShare,
      };
    case 'Toggle_Selection': {
      const newSelected = state.selected.includes(action.id)
        ? state.selected.filter(selectedId => selectedId !== action.id)
        : [...state.selected, action.id];
      return { ...state, selected: newSelected };
    }
    case 'Clear_Selections':
      return {
        ...state,
        selected: [],
      };
    default:
      return state;
  }
};
