import React, { useState } from 'react';
import useSWR from 'swr';
import toast, { Toaster } from 'react-hot-toast';

import { useUser } from 'contexts/user';
import FontLoader from 'components/FontLoader';
import PageContent from 'components/PageContent';
import InlineForm from 'components/InlineForm';
import { InputCSS } from 'components/Styles';
import { defaultFonts, FontType } from 'lib/fonts';

export default function SettingsFonts() {
  const { user, userDispatch } = useUser();

  // get every Google Font as { name, fontFamily }
  const { data: allGoogleFonts, error: allGoogleFontsError } = useSWR<
    FontType[]
  >(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_KEY}`,
    async url => {
      const resp = await fetch(url);
      const data = await resp.json();
      // return error if bad response
      if (!resp.ok) throw new Error(data.error.message);

      // manipulate the huge Google Fonts items array into our
      return data.items.map(({ family, category }) => {
        const fallback = category === 'display' ? 'cursive' : category;
        return {
          name: family,
          fontFamily: `${family}, ${fallback}`,
        };
      });
    }
  );

  // SAMPLE FONT STYLES
  const defaultText = 'This is some editable sample text for the current font.';
  const [exampleTextValue, setExampleTextValue] = useState(defaultText);

  // NEW FONT INPUT STATE
  const [newFontValue, setNewFontValue] = useState('');
  const allFonts = [...defaultFonts, ...user.extraFonts];

  const onSubmitNewFont = async (givenFontName: string) => {
    const googleURL = 'https://fonts.googleapis.com/css2?family=';
    const lowAndTogether = (str: string) => str.replace(' ', '').toLowerCase();
    const convertName = (name: string) => name.replace(' ', '+');
    const newFontName = givenFontName.trim();
    const newFontNameLowAndTogether = lowAndTogether(newFontName);
    try {
      if (newFontName.length < 2) {
        throw new Error('The font name must be over 2 characters.');
      }
      // check to see if the user already has added that font
      const isUnique = !allFonts.some(
        ({ name }) => lowAndTogether(name) === newFontNameLowAndTogether
      );
      if (!isUnique) {
        setNewFontValue('');
        throw new Error('You already have that font added.');
      }
      // if there was an error fetching all the files, we'll show an error
      if (allGoogleFontsError) throw new Error(allGoogleFontsError);
      // otherwise we'll get the font object string with fallback
      const newFont = allGoogleFonts.find(
        ({ name }) => lowAndTogether(name) === newFontNameLowAndTogether
      );
      // if the font isn't in our array the user must've spelt it incorrectly
      if (!newFont) {
        throw new Error(
          "Couldn't find that font. Are you sure you spelt it correctly?"
        );
      }
      // otherwise let's fetch the font file -- loading it before showing it in action
      await fetch(`${googleURL}${convertName(newFont.name)}`);
      // then we'll reset the input and add the font to our extra fonts
      // NEED TO SAVE TO USER OBJECT OR LOCALSTORAGE TO PERSIST
      setNewFontValue('');
      userDispatch({ type: 'Add_New_Font', newFont });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <FontLoader />
      <Toaster />

      <PageContent.Header id="fonts">Fonts</PageContent.Header>
      <PageContent.Text>
        Did you know you can change your game's font at any point? Below is a
        list of pre-added fonts that you may choose from. You can also look{' '}
        <a href="https://fonts.google.com/" target="_blank">
          Google Fonts
        </a>{' '}
        for more and add them to your list below!
      </PageContent.Text>

      <InlineForm
        placeholder="Enter a font name from Google Fonts here"
        style={{ margin: '1.5rem auto 1.75rem', maxWidth: 400 }}
        value={newFontValue}
        onSubmit={onSubmitNewFont}
        onChange={setNewFontValue}
      />

      <PageContent.List
        isHorizontal
        style={{ width: '80%', margin: '1.5rem auto 1.75rem' }}
      >
        {allFonts.map(({ name, fontFamily }, i) => (
          <React.Fragment key={name}>
            {!!i && <span style={{ marginInline: '0.5rem' }}>·</span>}
            <li>
              <button
                style={{
                  fontFamily,
                  textDecoration: user.activeFont === fontFamily && 'underline',
                }}
                onClick={() =>
                  userDispatch({ type: 'Set_Active_Font', font: fontFamily })
                }
              >
                {name}
              </button>
            </li>
          </React.Fragment>
        ))}
      </PageContent.List>

      <input
        type="text"
        className="sample_text"
        style={{ fontFamily: user.activeFont }}
        value={exampleTextValue}
        onChange={e => setExampleTextValue(e.target.value)}
        onBlur={() => setExampleTextValue(state => state || defaultText)}
      />

      {InputCSS.styles}
      <style jsx>{`
        button {
          background: none;
          padding: 0;
          color: #323335;
          text-decoration-color: #489dca;
        }

        input.sample_text {
          border: none;
          outline: none;
          width: 100%;
          margin: 0 auto;
          display: block;
          text-align: center;
        }
      `}</style>
    </>
  );
}
