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
          GIFs are randomly pulled from{' '}
          <a href="https://www.giphy.com" target="_blank" rel="noreferrer">
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
            Any preloaded GIFs will be saved in your browser until one of the
            following happens:
          </li>
          <ul>
            <li>you use them</li>
            <li>you remove them</li>
            <li>12 hours passes, then we consider them expired</li>
          </ul>
          <li>If you refresh your browser, we'll reload all saved GIFs</li>
          <strong>Think of it this way:</strong>
          <ul>
            <li>
              You preload some GIFs and have 10 that you like for today's
              classes.
            </li>
            <li>
              You use up those GIFs on your first class but saved them instead
              of removing them.
            </li>
            <li>
              You come back to the site during your second class and all of
              those saved GIFs will automatically reload, so you can use the
              same 10 again.
            </li>
            <li>
              This way we don't need to fetch possibly hundreds of unused GIFs
              weekly.
            </li>
            <li>
              Also, it's easier to remember which GIFs you students have already
              seen. Instead of seeing 40 GIFs and forgetting which GIFs each
              class saw, you'll know that those classes saw only those 10 GIFs.
            </li>
          </ul>
        </PageContent.List>

        <li>
          Only GIFs with a{' '}
          <a
            href="https://support.giphy.com/hc/en-us/articles/360058840971-Content-Rating"
            target="_blank"
            rel="noreferrer"
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
            Due to this, we highly recommend taking a moment to check GIFs
            before using them.
          </li>
        </PageContent.List>

        <li>
          We can ensure you don't see the same GIF multiple times if it's saved,
          but due to the randomness when fetching, we cannot can guarantee that
          you won't see the same GIF on different days. Especially if your
          search terms are specific. After all there's only so many GIFs out
          there.
        </li>
      </PageContent.List>

      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </div>
  );
}
