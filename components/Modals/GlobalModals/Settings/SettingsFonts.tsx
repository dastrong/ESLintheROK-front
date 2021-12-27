import React, { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrashAlt, FaCaretDown } from 'react-icons/fa';

import { useFont } from 'contexts/fonts';
import useUserSession from 'hooks/useUserSession';
import { FontType } from 'lib/fonts';
import { apiFetchToken } from 'utils/fetchers';

import FontLoader from 'components/FontLoader';
import PageContent from 'components/PageContent';
import InlineForm from 'components/InlineForm';
import Button from 'components/Button';
import Popup from 'components/Popup';
import { InputCSS } from 'components/Styles';

export default function SettingsFonts() {
  const { session, updateSession } = useUserSession();

  const { selectedFont, fonts, fontDispatch } = useFont();

  // get every Google Font as { name, fallback }
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
          fallback,
        };
      });
    }
  );

  // SAMPLE FONT STYLES
  const defaultText = 'This is some editable sample text for the current font.';
  const [exampleTextValue, setExampleTextValue] = useState(defaultText);

  // NEW FONT INPUT STATE
  const [newFontValue, setNewFontValue] = useState('');

  // used when a user submit a new font
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
      const isUnique = !fonts.some(
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
      setNewFontValue('');
      // creates a new font in the DB or add the userId to the existing collection
      const { name, fallback, _id } = await apiFetchToken(
        '/fonts',
        { method: 'POST', body: JSON.stringify({ ...newFont }) },
        session.accessToken
      );
      // if we successfully added the font to the DB, let's update our local state
      fontDispatch({ type: 'Add_Font', name, fallback, _id });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const setNewDefaultFont = async (fontName: string) => {
    try {
      const defaultFont = await apiFetchToken(
        '/fonts/user/default',
        { method: 'POST', body: JSON.stringify({ fontName }) },
        session.accessToken
      );
      updateSession({ ...session, defaultFont });
      fontDispatch({ type: 'Select_Font', fontName });
    } catch (err) {
      console.log(err);
      toast.error('Unexpected Error Occurred');
    }
  };

  const deleteUserFont = async (_id: string) => {
    try {
      const data = await apiFetchToken(
        '/fonts',
        { method: 'DELETE', body: JSON.stringify({ _id }) },
        session.accessToken
      );
      toast.success(`Successfully Removed: ${data.name}`);
      fontDispatch({ type: 'Remove_Font', _id });
    } catch (err) {
      console.log(err);
      toast.error('Unexpected Error Occurred');
    }
  };

  return (
    <>
      <FontLoader />
      <Toaster />

      <PageContent.Header id="fonts">Fonts</PageContent.Header>
      <PageContent.Text>
        Did you know you can change the font used in any game at any point
        through this menu? Furthermore, you can add to our default fonts below
        after signing in. Browse{' '}
        <a href="https://fonts.google.com/" target="_blank">
          Google Fonts
        </a>{' '}
        until you find some you like and add it to your list below!
      </PageContent.Text>
      <PageContent.Text>
        By default, every time you reload the page, we'll randomly set a font
        for you from your list, unless you specify a default font below.
      </PageContent.Text>

      <div className="default_font_banner">
        <Popup
          interactive
          delayHide={100}
          hideTooltip={!session}
          addStyles={{ height: 175, width: 175, overflowY: 'scroll' }}
          owner={
            <span style={{ cursor: session ? 'pointer' : 'not-allowed' }}>
              Default Font: <strong>{session?.defaultFont || 'Random'}</strong>
              <FaCaretDown
                style={{ verticalAlign: 'middle', paddingLeft: 4 }}
              />
            </span>
          }
        >
          <ul className="default_font_dropdown">
            <li>
              <button onClick={() => setNewDefaultFont('random')}>
                Randomize It
              </button>
            </li>
            <hr />
            {fonts.map(({ name, fallback }) => (
              <li key={name} style={{ padding: 4 }}>
                <button
                  style={{ fontFamily: `${name}, ${fallback}` }}
                  onClick={() => setNewDefaultFont(name)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </Popup>
        <br />
        {session ? (
          <InlineForm
            placeholder="Enter a font name from Google Fonts here"
            style={{ margin: '1rem auto 1.75rem', maxWidth: 400 }}
            value={newFontValue}
            onSubmit={onSubmitNewFont}
            onChange={setNewFontValue}
          />
        ) : (
          <Link href="/auth/signin" passHref>
            <Button
              as="a"
              color="white"
              bgColor="#04a7fb"
              text="Log in to save your customized fonts"
              style={{ margin: '1rem auto 0' }}
            />
          </Link>
        )}
      </div>

      <PageContent.List
        isHorizontal
        style={{ width: '80%', margin: '1.5rem auto 1.75rem' }}
      >
        {fonts.map(({ name, fallback, _id }, i) => (
          <li key={name}>
            {!!i && <span style={{ marginInline: '0.25rem' }}>·</span>}
            <Popup
              hideTooltip={!_id}
              interactive
              delayHide={100}
              delayShow={500}
              addStyles={{ borderRadius: '25%', padding: 4 }}
              owner={
                <button
                  style={{
                    fontFamily: `${name}, ${fallback}`,
                    textDecoration: selectedFont.name === name && 'underline',
                  }}
                  onClick={() => {
                    fontDispatch({ type: 'Select_Font', fontName: name });
                  }}
                >
                  {name}
                </button>
              }
            >
              <Button
                rounded
                size="xs"
                color="white"
                bgColor="red"
                Icon={FaTrashAlt}
                disabled={name === session?.defaultFont}
                onClick={() => deleteUserFont(_id)}
              />
            </Popup>
          </li>
        ))}
      </PageContent.List>

      <input
        type="text"
        className="sample_text"
        style={{ fontFamily: selectedFont.fontFamily }}
        value={exampleTextValue}
        onChange={e => setExampleTextValue(e.target.value)}
        onBlur={() => setExampleTextValue(state => state.trim() || defaultText)}
      />

      {InputCSS.styles}
      <style jsx>{`
        button {
          background: none;
          padding: 0.25rem;
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

        .default_font_banner {
          display: block;
          text-align: center;
          font-size: 0.9em;
          margin: 1rem auto;
        }

        .default_font_banner span {
          cursor: pointer;
        }

        .default_font_banner strong {
          text-transform: capitalize;
        }

        .default_font_dropdown {
          list-style: none;
          padding-left: 5px;
          margin: 0;
          text-align: center;
        }

        .default_font_dropdown hr {
          margin: 0.5rem 0;
          border: none;
          border-bottom: 1px solid rgba(34, 36, 38, 0.15);
        }
      `}</style>
    </>
  );
}
