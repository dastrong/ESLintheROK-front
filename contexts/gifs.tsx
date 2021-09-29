import React, { createContext, useContext, useReducer } from 'react';
import { IGif } from '@giphy/js-types';
import { GifResult, GiphyFetch } from '@giphy/js-fetch-api';

type Show = 'single' | 'grid' | '';

type GifState = {
  show: Show;
  gifs: IGif[];
  removedGifIds: string[];
  usedGifIds: string[];
  searchTerm: string;
};

type GifAction =
  | { type: 'Open_Gif'; show: Show }
  | { type: 'Close_Gif' }
  | { type: 'Set_Gif'; gif: IGif }
  | { type: 'Remove_Gif'; id: string }
  | { type: 'Use_Gif'; id: string }
  | { type: 'Update_Search_Term'; newSearchTerm: string };

const setGifStorage = (data: GifState) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('gifStorage', JSON.stringify(data));
};

const getGifStorage = () => {
  if (typeof window === 'undefined') return null;
  const gifStorage: GifState = JSON.parse(localStorage.getItem('gifStorage'));
  if (!gifStorage) return null;
  return gifStorage;
};

const init = (): GifState => {
  const gifState = getGifStorage();

  return {
    ...gifState,
    show: 'single',
    gifs: [],
    removedGifIds: [],
    usedGifIds: [],
    searchTerm: 'dog',
    // searchTerm: 'funny, fail',
  };
};

const initialState = init();

const reducer = (state: GifState, action: GifAction): GifState => {
  switch (action.type) {
    case 'Open_Gif':
      return { ...state, show: action.show };
    case 'Close_Gif':
      return { ...state, show: '' };
    case 'Set_Gif':
      return { ...state, gifs: [...state.gifs, action.gif] };
    case 'Remove_Gif':
      return {
        ...state,
        gifs: state.gifs.filter(gif => String(gif.id) !== action.id),
        removedGifIds: [...state.removedGifIds, action.id],
      };
    case 'Use_Gif':
      return { ...state, usedGifIds: [...state.usedGifIds, action.id] };
    case 'Update_Search_Term':
      return { ...state, searchTerm: action.newSearchTerm };
    default:
      return state;
  }
};

const GifContext = createContext(
  {} as GifState & {
    gifDispatch: React.Dispatch<GifAction>;
    fetchGif: (searchTerm?: string) => Promise<GifResult>;
  }
);

// reusable function to fetch GIFs
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY);
const fetchGif = async (searchTerm = 'funny, fail') => {
  return await gf.random({ tag: searchTerm, rating: 'g' });
};

export const GifProvider = ({ children }) => {
  const [state, gifDispatch] = useReducer(reducer, initialState);

  return (
    <GifContext.Provider value={{ ...state, gifDispatch, fetchGif }}>
      {children}
    </GifContext.Provider>
  );
};

export const useGifs = () => useContext(GifContext);
