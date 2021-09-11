import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { defaultFonts, getRandomFont, FontType } from 'lib/fonts';
import useUserSession from 'hooks/useUserSession';

type FontState = {
  fonts: FontType[];
  selectedFont: FontType & {
    fontFamily: string;
  };
};

type FontAction =
  | { type: 'Select_Font'; fontName: string }
  | ({ type: 'Add_Font' } & FontType)
  | { type: 'Remove_Font'; _id: string }
  | { type: 'Set_User_Fonts'; fonts: FontType[]; selection: string }
  | { type: 'Remove_User_Fonts' };

const initialState: FontState = {
  fonts: defaultFonts,
  selectedFont: {
    name: 'Poppins',
    fallback: 'sans-serif',
    fontFamily: 'Poppins, sans-serif',
  },
};

const init = (): FontState => {
  const { name, fallback } = getRandomFont(defaultFonts);
  return {
    fonts: defaultFonts,
    selectedFont: {
      name,
      fallback,
      fontFamily: `${name}, ${fallback}`,
    },
  };
};

const reducer = (state: FontState, action: FontAction): FontState => {
  switch (action.type) {
    case 'Select_Font': {
      // when given the name of the font, get the fallback and set em
      const { name, fallback } =
        action.fontName === 'random'
          ? getRandomFont(state.fonts)
          : state.fonts.find(({ name }) => name === action.fontName);
      return {
        ...state,
        selectedFont: {
          name,
          fallback,
          fontFamily: `${name}, ${fallback}`,
        },
      };
    }
    case 'Add_Font': {
      const { name, fallback } = action;
      return {
        ...state,
        fonts: [...state.fonts, { name, fallback }],
      };
    }
    case 'Remove_Font':
      return {
        ...state,
        fonts: state.fonts.filter(({ _id }) => _id !== action._id),
      };
    case 'Set_User_Fonts': {
      const newFontState = [...defaultFonts, ...action.fonts];
      // if we can find the selection, return it
      // ...otherwise, randomize it
      const { name, fallback } =
        newFontState.find(({ name }) => name === action.selection) ||
        getRandomFont(newFontState);

      return {
        ...state,
        fonts: newFontState,
        selectedFont: {
          name,
          fallback,
          fontFamily: `${name}, ${fallback}`,
        },
      };
    }
    case 'Remove_User_Fonts': {
      const { name, fallback } = getRandomFont(defaultFonts);
      return {
        ...state,
        fonts: defaultFonts,
        selectedFont: {
          name,
          fallback,
          fontFamily: `${name}, ${fallback}`,
        },
      };
    }
    default:
      return state;
  }
};

const FontContext = createContext(
  {} as FontState & { fontDispatch: React.Dispatch<FontAction> }
);

export const FontProvider = ({ children }) => {
  const { session } = useUserSession();

  const [state, fontDispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    const getUserFonts = () => {
      // on load or sign in, fetch the user's custom fonts
      fetch('http://localhost:4000/api/fonts', {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
        .then(resp => resp.json())
        .then((fonts: FontType[]) => {
          const selection = session.defaultFont || 'random';
          fontDispatch({ type: 'Set_User_Fonts', fonts, selection });
        })
        .catch(err => console.error(err));
    };

    // if a user has logged out we need to remove their fonts
    if (session) {
      getUserFonts();
    } else {
      fontDispatch({ type: 'Remove_User_Fonts' });
    }
  }, [session]);

  return (
    <FontContext.Provider value={{ ...state, fontDispatch }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
