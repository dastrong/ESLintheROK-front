import React from 'react';
import Carousel from 'components/Carousel';

const popularSearches = [
  { id: 'dog', text: 'dog' },
  { id: 'cat', text: 'cat' },
  { id: 'fail', text: 'fail' },
  { id: 'funny, animal', text: 'funny, animal' },
  { id: 'funny, kids', text: 'funny, kids' },
  { id: 'BTS', text: 'BTS' },
];

type Props = {
  searchTerm: string;
  handleClick: (id: string) => void;
};

export default function GifGridCarousel({ searchTerm, handleClick }: Props) {
  // check if the searchTerm is unique and NOT a popular one listed above
  const uniqueSearch = popularSearches.every(
    search => search.id !== searchTerm
  );

  return (
    <Carousel
      width="450px"
      itemColorScale={['#ff69b4', '#1f82fd']}
      handleClick={handleClick}
      activeItem={uniqueSearch ? null : searchTerm}
      buttonSize="sm"
      numOfItemsToShow={3}
      numOfItemsToSlide={2}
      items={popularSearches}
    />
  );
}
