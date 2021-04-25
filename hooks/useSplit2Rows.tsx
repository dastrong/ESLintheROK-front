import React from 'react';

type GameDataAsRowsType = {
  text: string;
  ref: React.RefObject<HTMLSpanElement>;
}[][];

// manipulates gameData arrays so we can manage animations easier
export default function useSplit2Rows(
  refs: React.RefObject<HTMLSpanElement>[],
  gameData: string[],
  chunk = 2
): GameDataAsRowsType {
  if (process.env.NODE_ENV !== 'production') {
    if (gameData.length !== refs.length) {
      throw new Error(
        'The given refs and array have different lengths. They should be equal.'
      );
    }
    if (gameData.length % chunk !== 0) {
      throw new Error('You created uneven chunks. They should be equal.');
    }
  }

  return gameData.reduce((acc, cVal, i) => {
    // create an obj with the ref and text
    const val = { text: cVal, ref: refs[i] };

    // determine if we need to add to the last chunk or start a new one
    if (i % chunk === 0) {
      // start new row
      acc.push([val]);
    } else {
      // add to last row
      acc[acc.length - 1].push(val);
    }

    return acc;
  }, [] as GameDataAsRowsType);
}
