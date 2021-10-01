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

type GifDataState = Omit<GifState, 'show' | 'usedGifIds'>;
type LocalState = { expires: number; data: GifDataState };

type GifAction =
  | { type: 'Open_Gif'; show: Show }
  | { type: 'Close_Gif' }
  | { type: 'Set_Gif'; gif: IGif }
  | { type: 'Remove_Gif'; id: string }
  | { type: 'Use_Gif'; id: string }
  | { type: 'Update_Search_Term'; newSearchTerm: string }
  | { type: 'Clear_All' };

const setGifStorage = (data: GifDataState) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    'gifStorage',
    JSON.stringify({ data, expires: Date.now() + 1000 * 60 * 60 * 12 })
  );
};

const getGifStorage = () => {
  if (typeof window === 'undefined') return null;
  // check localStorage for some past gifs stored there
  const gifStorage: LocalState = JSON.parse(localStorage.getItem('gifStorage'));
  if (!gifStorage) return null;

  // check if it's expired -> over 12 hours old
  const isExpired = Date.now() > gifStorage.expires;
  if (isExpired) {
    // remove it from localStorage if it's old
    localStorage.removeItem('gifStorage');
    return null;
  }
  // otherwise, return the data portion
  return gifStorage.data;
};

const initialGifDataState: GifDataState = {
  gifs: [],
  removedGifIds: [],
  searchTerm: 'dog',
};

const init = (): GifState => {
  const gifState = getGifStorage();

  return {
    show: '',
    usedGifIds: [],
    ...(gifState || initialGifDataState),
  };
};

const initialState = init();

const reducer = (state: GifState, action: GifAction): GifState => {
  switch (action.type) {
    case 'Open_Gif':
      return { ...state, show: action.show };
    case 'Close_Gif':
      return { ...state, show: '' };
    case 'Set_Gif': {
      const updatedGifs = [...state.gifs, action.gif];
      setGifStorage({
        searchTerm: state.searchTerm,
        gifs: updatedGifs,
        removedGifIds: state.removedGifIds,
      });
      return { ...state, gifs: updatedGifs };
    }
    case 'Remove_Gif': {
      const updatedGifs = state.gifs.filter(
        gif => String(gif.id) !== action.id
      );
      const updatedRemovedGifIds = [...state.removedGifIds, action.id];
      setGifStorage({
        searchTerm: state.searchTerm,
        gifs: updatedGifs,
        removedGifIds: updatedRemovedGifIds,
      });
      return {
        ...state,
        gifs: updatedGifs,
        removedGifIds: updatedRemovedGifIds,
      };
    }
    case 'Use_Gif':
      return { ...state, usedGifIds: [...state.usedGifIds, action.id] };
    case 'Update_Search_Term': {
      const updatedSearchTerm = action.newSearchTerm;
      setGifStorage({
        searchTerm: updatedSearchTerm,
        gifs: state.gifs,
        removedGifIds: state.removedGifIds,
      });
      return { ...state, searchTerm: updatedSearchTerm };
    }
    case 'Clear_All': {
      localStorage.removeItem('gifStorage');
      return {
        ...state,
        show: 'grid',
        usedGifIds: [],
        ...initialGifDataState,
      };
    }
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
const fetchGif = async (searchTerm = 'dog') => {
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
