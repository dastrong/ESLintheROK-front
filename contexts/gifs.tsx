import React, { createContext, useContext, useEffect, useReducer } from 'react';
import useUserSession from 'hooks/useUserSession';

type GifState = {
  gifs: string[];
};

type GifAction =
  | { type: '' }
  | { type: '' }
  | { type: '' }
  | { type: '' }
  | { type: '' };

const initialState: GifState = {
  gifs: [],
};

const reducer = (state: GifState, action: GifAction): GifState => {
  switch (action.type) {
    case '':
      return { ...state };
    default:
      return state;
  }
};

const GifContext = createContext(
  {} as GifState & { gifDispatch: React.Dispatch<GifAction> }
);

export const GifProvider = ({ children }) => {
  const { session } = useUserSession();

  const [state, gifDispatch] = useReducer(reducer, initialState);

  return (
    <GifContext.Provider value={{ ...state, gifDispatch }}>
      {children}
    </GifContext.Provider>
  );
};

export const useFont = () => useContext(GifContext);
