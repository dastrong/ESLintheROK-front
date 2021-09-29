import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Grid } from '@giphy/react-components';
import { GifsResult } from '@giphy/js-fetch-api';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

import { useGifs } from 'contexts/gifs';
import Modal from 'components/Modals';
import Button from 'components/Button';
import InlineForm from 'components/InlineForm';
import GifOverlay from './GifOverlay';

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
      <Modal.Header closeModal={closeModal}>Random Gif Grid</Modal.Header>

      <Modal.Content
        style={{ height: 'calc(100% - 56px - 74px)', overflowY: 'scroll' }}
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

      <Modal.Actions hideActions style={{ justifyContent: 'flex-start' }}>
        <Button
          color="white"
          bgColor="hotpink"
          Icon={BsFillEyeFill}
          onClick={() => gifDispatch({ type: 'Open_Gif', show: 'single' })}
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
          style={{ display: 'inline-block', margin: '0 1rem', maxWidth: 250 }}
        />
        <span style={{ opacity: 0.8 }}>
          *Multi term searches must be separated with a comma
        </span>
      </Modal.Actions>
    </>
  );
}
