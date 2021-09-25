import React from 'react';
import { RiFileGifLine } from 'react-icons/ri';

import { useStore } from 'contexts/store';
import { useGifs } from 'contexts/gifs';
import PageContent from 'components/PageContent';
import Button from 'components/Button';

export default function SettingsGifs() {
  const { storeDispatch } = useStore();
  const { gifDispatch } = useGifs();

  const openGifModal = () => {
    storeDispatch({ type: 'Close_Settings' });
    gifDispatch({ type: 'Open_Gif', show: 'grid' });
  };

  return (
    <div>
      <PageContent.Header>GIFs</PageContent.Header>

      <Button
        color="white"
        bgColor="#04a7fb"
        text="View/Manage GIFs"
        iconPosition="right"
        style={{ position: 'absolute', right: 0, top: -7 }}
        onClick={openGifModal}
      />

      <PageContent.Text>
        If you see this icon{' '}
        <RiFileGifLine
          style={{ verticalAlign: 'middle', fontSize: '1.5rem' }}
        />{' '}
        on the games page, then that game incorporates GIFs in some way,
        typically as a round reward. We manage getting and showing random GIFs
        for you automatically, however we now offer a way for you do review and
        decline GIFs before using them.
      </PageContent.Text>
      <PageContent.Text
        style={{
          marginBottom: 0,
          textDecoration: 'solid underline #489dca',
          fontWeight: 'bold',
        }}
      >
        How It Works:
      </PageContent.Text>
      <PageContent.List>
        <li>
          The GIFs are randomly pulled from{' '}
          <a href="https://www.giphy.com" target="_blank">
            GIPHY
          </a>
        </li>
        <PageContent.List style={{ fontSize: '1em', marginBottom: 8 }}>
          <li>
            We load them on demand unless you preload them
            <Button
              inverted
              color="white"
              bgColor="#489dca"
              text="here"
              style={{ border: 'none', padding: 0, paddingLeft: 4 }}
              onClick={openGifModal}
            />
            .
          </li>
          <li>
            Any preloaded GIFs will be saved in your browser until the next time
            you use them.
          </li>
        </PageContent.List>
        <li>
          Due to this randomness, we cannot guarantee that you won't see the
          same GIF twice.
        </li>
        <li>
          Only GIFs with a{' '}
          <a
            href="https://support.giphy.com/hc/en-us/articles/360058840971-Content-Rating"
            target="_blank"
          >
            G rating
          </a>{' '}
          are pulled, but sometimes even those might be deemed inappropriate for
          your classes
        </li>
        <PageContent.List
          style={{ fontSize: '1em', marginTop: 0, marginBottom: 8 }}
        >
          <li>
            Because of this, we suggest taking a moment to check GIFs before
            using them.
          </li>
        </PageContent.List>
      </PageContent.List>

      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </div>
  );
}
