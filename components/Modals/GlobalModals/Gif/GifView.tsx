import React, { useEffect, useState } from 'react';
import { Gif } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import useWindowSize from 'react-use/lib/useWindowSize';

import { useGifs } from 'contexts/gifs';
import Modal from 'components/Modals';
import Button from 'components/Button';

export default function GifView() {
  const { width, height } = useWindowSize();
  const [oneTimeGif, setOneTimeGif] = useState<IGif>();

  const { gifs, declinedGifIds, usedGifIds, gifDispatch, fetchGif } = useGifs();
  const closeModal = () => gifDispatch({ type: 'Close_Gif' });

  useEffect(() => {
    const getAndSetGif = async () => {
      const gif = await fetchGif();
      setOneTimeGif(gif.data);
    };

    if (!gifs.length) getAndSetGif();
  }, []);

  const usedOrDeletedGifIds = [...declinedGifIds, ...usedGifIds];
  const currentGifIndex = gifs.findIndex(
    gif => !usedOrDeletedGifIds.includes(String(gif.id))
  );
  const currentGif = gifs[currentGifIndex] || oneTimeGif;

  // need to calculate width/height to fill the container correctly
  const gifWidth = currentGif?.images.original.width || 0;
  const gifHeight = currentGif?.images.original.height || 0;
  const containerHeight = height * 0.95 - 56 - 74 - 32 - 2;
  const containerWidth = width * 0.95 - 32 - 10;
  const heightDiffPer = containerHeight / gifHeight;
  const widthDiffPer = containerWidth / gifWidth;
  let calculatedWidth: number;
  let calculatedHeight: number;
  if (heightDiffPer < widthDiffPer) {
    const ratio = containerHeight / gifHeight;
    calculatedWidth = gifWidth * ratio;
    calculatedHeight = containerHeight;
  } else {
    const ratio = containerWidth / gifWidth;
    calculatedWidth = containerWidth;
    calculatedHeight = gifHeight * ratio;
  }

  return (
    <>
      <Modal.Header closeModal={closeModal}>Viewing Random Gif</Modal.Header>

      <Modal.Content
        style={{
          height: 'calc(100% - 56px - 74px)',
          overflowY: 'scroll',
          display: 'flex',
        }}
      >
        {currentGif ? (
          <Gif
            noLink
            hideAttribution
            gif={currentGif}
            width={calculatedWidth}
            height={calculatedHeight}
            style={{ margin: 'auto' }}
          />
        ) : null}
      </Modal.Content>
      <Modal.Actions
        confirmText={!gifs[0] ? 'Close Modal' : 'Mark GIF as Used and Close'}
        confirmClick={() => {
          closeModal();
          if (!gifs[0]) return;
          gifDispatch({
            type: 'Use_Gif',
            id: String(gifs[currentGifIndex].id),
          });
        }}
      >
        <Button
          color="white"
          bgColor="hotpink"
          Icon={BsFillGrid1X2Fill}
          onClick={() => gifDispatch({ type: 'Open_Gif', show: 'grid' })}
        />
      </Modal.Actions>
    </>
  );
}
