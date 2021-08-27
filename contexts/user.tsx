import React, { createContext, useContext, useReducer } from 'react';
import { FontType } from 'lib/fonts';

type UserState = {
  extraFonts: FontType[];
  activeFont: string;
};

type UserAction =
  | { type: 'Add_New_Font'; newFont: FontType }
  | { type: 'Set_Active_Font'; font: string };

const user: UserState = {
  extraFonts: [],
  activeFont: 'Poppins, sans-serif',
};

const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'Add_New_Font':
      return {
        ...state,
        extraFonts: [...state.extraFonts, action.newFont],
        activeFont: action.newFont.fontFamily,
      };
    case 'Set_Active_Font':
      return { ...state, activeFont: action.font };
    default:
      return state;
  }
};

const UserContext = createContext(
  {} as { user: UserState; userDispatch: React.Dispatch<UserAction> }
);

export const UserProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(reducer, user);

  return (
    <UserContext.Provider value={{ user: state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
