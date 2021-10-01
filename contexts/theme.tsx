import React, { createContext, useContext, useReducer } from 'react';

type ThemeState = {
  font: string;
  colors: {
    blue: string;
    red: string;
    gray: string;
  };
};

type ThemeAction = { type: 'ChangeFont'; font: string };

const theme: ThemeState = {
  font: '',
  colors: {
    blue: '#0047a0',
    red: '#cd2e3a',
    gray: '#d0cbcd',
  },
};

const reducer = (state: ThemeState, action: ThemeAction) => {
  switch (action.type) {
    case 'ChangeFont':
      return { ...state, font: action.font };
    default:
      return state;
  }
};

const ThemeContext = createContext(
  {} as { theme: ThemeState; themeDispatch: React.Dispatch<ThemeAction> }
);

export const ThemeProvider = ({ children }) => {
  const [state, themeDispatch] = useReducer(reducer, theme);

  return (
    <ThemeContext.Provider value={{ theme: state, themeDispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
