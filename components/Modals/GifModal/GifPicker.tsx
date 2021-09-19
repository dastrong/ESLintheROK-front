import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import GifOverlay from './GifOverlay';

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY);
const searchTerm = 'funny, fail';
const fetchGifs = (offset: number) =>
  gf.search(searchTerm, { offset, limit: 10, rating: 'g' });

export default function GifPicker() {
  const { width } = useWindowSize();

  return (
    <Grid
      noLink
      columns={3}
      width={width * 0.95 - 32}
      fetchGifs={fetchGifs}
      onGifClick={console.log}
      key="funny, fail"
      overlay={GifOverlay}
    />
  );
}
