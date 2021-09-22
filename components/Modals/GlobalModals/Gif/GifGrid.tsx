import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Grid } from '@giphy/react-components';
import { GifsResult } from '@giphy/js-fetch-api';
import { BsFillEyeFill } from 'react-icons/bs';

import { useGifs } from 'contexts/gifs';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import Button from 'components/Button';
import GifOverlay from './GifOverlay';

export default function GifGrid() {
  const { width } = useWindowSize();

  const { gifs, declinedGifIds, gifDispatch, fetchGif } = useGifs();
  const { storeDispatch } = useStore();
  const closeModal = () => storeDispatch({ type: 'Close_Gif' });

  const fetchGifs = async (offset: number): Promise<GifsResult> => {
    const gif = await fetchGif();
    gifDispatch({ type: 'Set_Gif', gif: gif.data });
    return {
      data: [gif.data],
      meta: gif.meta,
      pagination: gif.pagination || { count: 1, total_count: 10000, offset },
    };
  };

  return (
    <>
      <Modal.Header closeModal={closeModal}>Random Gif Grid</Modal.Header>

      <Modal.Content
        style={{ height: 'calc(100% - 56px - 74px)', overflowY: 'scroll' }}
      >
        <Grid
          noLink
          initialGifs={gifs}
          columns={3}
          width={width * 0.95 - 32}
          fetchGifs={fetchGifs}
          loaderConfig={{ rootMargin: '-100px', threshold: 0 }}
          overlay={props => (
            <GifOverlay
              {...props}
              isBlocked={declinedGifIds.includes(String(props.gif.id))}
              blockGif={() => {
                gifDispatch({ type: 'Block_Gif', id: String(props.gif.id) });
              }}
            />
          )}
          onGifsFetchError={console.info}
        />
      </Modal.Content>

      <Modal.Actions confirmText="Close Modal" confirmClick={closeModal}>
        <Button
          color="white"
          bgColor="hotpink"
          Icon={BsFillEyeFill}
          onClick={() => gifDispatch({ type: 'View_Gif', view: 'single' })}
        />
      </Modal.Actions>
    </>
  );
}
