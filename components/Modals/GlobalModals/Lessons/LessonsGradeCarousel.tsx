import React from 'react';
import Carousel from 'components/Carousel';
import { Dispatch, Grade } from './Lessons.types';

export default function LessonsGradeCarousel({
  grades,
  dispatch,
  activeItem,
}: {
  grades: Grade[];
  dispatch: Dispatch;
  activeItem?: string;
}) {
  // manipulate the fetches grades into a format the Carousel can understand
  const carouselItems = grades
    .sort((a, b) => a.grade - b.grade)
    .map(({ grade, _id }) => ({ text: `Grade ${grade}`, id: _id }));

  return (
    <Carousel
      width="450px"
      itemColorScale={['#a56eec', '#138039']}
      items={carouselItems}
      activeItem={activeItem}
      numOfItemsToShow={Math.min(5, carouselItems.length)}
      handleClick={(chosenGrade: string) => {
        dispatch({ type: 'Choose_Grade', chosenGrade });
      }}
    />
  );
}
