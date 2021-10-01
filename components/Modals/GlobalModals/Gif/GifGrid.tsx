import React, { useEffect, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Grid } from '@giphy/react-components';
import { GifsResult } from '@giphy/js-fetch-api';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

import { useGifs } from 'contexts/gifs';
import Modal from 'components/Modals';
import Button from 'components/Button';
import InlineForm from 'components/InlineForm';
import Popup from 'components/Popup';
import GifHeader from './GifHeader';
import GifOverlay from './GifOverlay';
import GifGridCarousel from './GifGridCarousel';

export default function GifGrid() {
  const { width } = useWindowSize();

  const {
    gifs,
    removedGifIds,
    usedGifIds,
    gifDispatch,
    fetchGif,
    searchTerm,
  } = useGifs();
  const closeModal = () => gifDispatch({ type: 'Close_Gif' });

  // users can update the search term  we want ...
  // ... to hold that value until it's been submitted
  const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setNewSearchTerm(searchTerm);
  }, [searchTerm]);

  // modified function to pass into the GIPHY Grid component
  const fetchGifs = async (offset: number): Promise<GifsResult> => {
    const fetchedGif = await fetchGif(searchTerm);
    // check if this GIF has already been fetched
    const alreadyFetched = gifs.some(gif => gif.id === fetchedGif.data.id);
    // check if the user has already removed this GIF
    const wasRemoved = removedGifIds.includes(String(fetchedGif.data.id));
    // we don't want to return the GIF if they've already used or removed it
    if (alreadyFetched || wasRemoved) {
      console.info('This GIF was already processed. Skip it.');
      throw new Error('Already processed this GIF');
    }
    // GIPHY will return an modified object if nothing was found ...
    // ... we an id: string that equals 'undefined'
    if (fetchedGif.data.id === 'undefined') {
      console.info('No GIF found.');
      throw new Error('No GIF found.');
    }
    // otherwise, add the GIF to our GIF store
    gifDispatch({ type: 'Set_Gif', gif: fetchedGif.data });
    // and return it
    return {
      data: [fetchedGif.data],
      meta: fetchedGif.meta,
      pagination: fetchedGif.pagination || {
        count: 1,
        total_count: 10000,
        offset,
      },
    };
  };

  return (
    <>
      <GifHeader closeModal={closeModal} />

      <Modal.Content
        style={{ height: 'calc(100% - 56px - 82px)', overflowY: 'scroll' }}
      >
        <Toaster position="bottom-left" toastOptions={{ duration: 4000 }} />

        <Grid
          noLink
          key={gifs.toString() + searchTerm}
          initialGifs={gifs.filter(gif => !usedGifIds.includes(String(gif.id)))}
          columns={3}
          gutter={16}
          width={width * 0.95 - 32}
          fetchGifs={fetchGifs}
          loaderConfig={{ rootMargin: '-100px', threshold: 0 }}
          overlay={props => (
            <GifOverlay
              {...props}
              removeGif={() => {
                gifDispatch({ type: 'Remove_Gif', id: String(props.gif.id) });
              }}
            />
          )}
        />
      </Modal.Content>

      <Modal.Actions hideActions style={{ justifyContent: 'space-between' }}>
        <Button
          color="white"
          bgColor="hotpink"
          Icon={BsFillEyeFill}
          onClick={() => gifDispatch({ type: 'Open_Gif', show: 'single' })}
        />
        <Popup
          interactive
          delayHide={100}
          owner={
            <Button
              color="white"
              bgColor="red"
              Icon={FaTrashAlt}
              style={{ marginLeft: 8 }}
            />
          }
        >
          <Button
            color="white"
            bgColor="red"
            text="Clear GIF History"
            onClick={() => gifDispatch({ type: 'Clear_All' })}
          />
        </Popup>
        <div>
          <span>Popular/Suggested Search Terms:</span>
          <GifGridCarousel
            searchTerm={searchTerm}
            handleClick={(popularSearchTerm: string) => {
              gifDispatch({
                type: 'Update_Search_Term',
                newSearchTerm: popularSearchTerm,
              });
            }}
          />
          <InlineForm
            placeholder="Search terms..."
            Icon={FaSearch}
            disabled={searchTerm === newSearchTerm}
            value={newSearchTerm}
            onChange={setNewSearchTerm}
            onSubmit={newSearchTerm => {
              gifDispatch({
                type: 'Update_Search_Term',
                newSearchTerm,
              });
              toast.success(
                <>
                  Updated search term.
                  <br />
                  Scroll down to view those results.
                </>
              );
            }}
            style={{
              display: 'inline-block',
              margin: '0 0 0 1rem',
              maxWidth: 250,
            }}
          />

          <style jsx>{`
            div {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              flex: 1;
              margin-left: 1rem;
              width: 100%;
            }

            span {
              opacity: 0.8;
              text-align: right;
              margin: 0 0.5rem;
              display: none;
            }

            @media screen and (min-width: 950px) {
              span {
                display: initial;
              }
            }
          `}</style>
        </div>
      </Modal.Actions>
    </>
  );
}
