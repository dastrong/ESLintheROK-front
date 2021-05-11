import shuffle from 'lodash.shuffle';
import { arrOfRandoNum } from '.';

// only ONE function is returned from this file
// all other functions are helper functions to this one
export default function splitString(text: string, numOfBoxes = 4) {
  const split = text.split(' ');
  const numOfWords = split.length;

  if (numOfWords === 1 || numOfBoxes === 1) {
    return __splitWord(text, numOfBoxes);
  }

  if (numOfWords === numOfBoxes) return split;

  if (numOfWords > numOfBoxes) return __getBestSplit(text, split, numOfBoxes);

  if (numOfWords === 2 && numOfBoxes === 4) {
    const halved = split.map(string => __halvedWord(string));
    return halved.reduce((acc, cVal) => [...acc, ...cVal], []);
  }

  // 1 less word than boxes
  // split the longest and keep the others the same
  const longestWord = __getLongestWord(split);
  const longestWordIndex = split.indexOf(longestWord);
  split.splice(longestWordIndex, 1);
  const splitWord = __halvedWord(longestWord);
  return [...split, ...splitWord];
}

// splits a word evenly (or as best as it can)
function __splitWord(word: string, numOfBoxes: number) {
  if (word.length > numOfBoxes) {
    const splitSpots = __getSplitSpots(word.length, numOfBoxes);
    const splitText = word.split('');
    return splitSpots.map(num => splitText.splice(0, num).join(''));
  } else if (word.length < numOfBoxes) {
    return Array.from(Array(numOfBoxes), (_, i) => word[i] || '');
  } else {
    return word.split('');
  }
}

// returns the longest word given an array of strings
function __getLongestWord(words: string[]) {
  return words.reduce(
    (acc, cVal) => (acc.length > cVal.length ? acc : cVal),
    ''
  );
}

// calculates the best way to split a longer string evenly
function __getBestSplit(text: string, split: string[], numOfBoxes: number) {
  const textLength = text.length;
  const numOfWords = split.length;

  // get the index of all the spaces (and the last character index)
  const indexOfSpaces = [
    ...text
      .split('')
      .reduce((acc, cVal, i) => (cVal === ' ' ? [...acc, i] : acc), []),
    textLength,
  ];

  // get all possible slice combinations
  let sliceCombos = __getSliceCombinations(
    numOfBoxes - 1,
    numOfWords - 1,
    numOfWords - 1
  );

  // reduce the number of combinations if it gets over 400
  // ex) sentences with over 15 words in 4 boxes
  if (sliceCombos.length > 455) {
    const condenseIndexes = arrOfRandoNum(sliceCombos.length, 0, 150, true);
    sliceCombos = sliceCombos.filter((_, i) => condenseIndexes.includes(i));
  }

  // get the indexes of the text string for every slice combination
  const textSliceCombos = sliceCombos.map(arrOfIndexes => {
    return arrOfIndexes.map(index => indexOfSpaces[index]);
  });

  // get the length of words for each potential slice combination
  const lengthOfWordsCombinations = textSliceCombos.map(indexArr => {
    return indexArr.reduce((acc, cVal, i) => {
      if (i === 0) return [cVal];
      return [...acc, cVal - indexArr[i - 1] - 1];
    }, []);
  });

  // get the lowest difference between the longest and shortest strings
  const minAndMaxDiffs = lengthOfWordsCombinations.map(lengths => {
    const { diff } = __getMinMaxAndDiff(lengths);
    return diff;
  });

  // get the lowest difference
  const minDiff = Math.min(...minAndMaxDiffs);

  // get the index of the first combo that has that diff
  const targetIndex = minAndMaxDiffs.findIndex(diff => diff === minDiff);

  // get the combo that matches the correct index
  const bestSliceCombo = textSliceCombos[targetIndex];

  // return an array of accurately sliced portions of the original text string
  return bestSliceCombo.map((slicer, i, arr) =>
    text.substring(i ? arr[i - 1] : 0, slicer)
  );
}

// returns the max, min, and difference values of an array of numbers
function __getMinMaxAndDiff(arr) {
  const max = arr.reduce((a, b) => Math.max(a, b));
  const min = arr.reduce((a, b) => Math.min(a, b));
  const diff = Math.abs(max - min);
  return { max, min, diff };
}

// used to evenly split a string, when the string is longer than 4
// returns an array of shuffled numbers where the string should be sliced
function __getSplitSpots(strLength, numOfBoxes) {
  let length = strLength;
  const splitSpots = Array.from(Array(numOfBoxes), (_, i) => {
    const splitSpot = Math.ceil(length / (numOfBoxes - i));
    length -= splitSpot;
    return splitSpot;
  });
  return shuffle(splitSpots);
}

// split a word into equal parts
// returns an array of both halves of the string
function __halvedWord(word) {
  const slicePos = Math.floor(word.length / 2);
  const start = word.substring(0, slicePos);
  const end = word.substring(slicePos);
  return [start, end];
}

// returns an array of incrementing numbers from 0 until count
function __getIncreNumArray(count) {
  return Array.from(Array(count), (_, i) => i);
}

// returns an array containing arrays of every possible combination of slice positions
function __getSliceCombinations(
  numOfSlots: number,
  rangeOfNum: number,
  lastIndex: number
) {
  const possibleNums = __getIncreNumArray(rangeOfNum);
  const end = possibleNums.length;

  const combs = [];

  for (let i = 0; i < end; i++) {
    if (numOfSlots === 1) {
      combs.push([i, lastIndex]);
    } else {
      for (let j = i + 1; j < end; j++) {
        if (numOfSlots === 2) {
          combs.push([i, j, lastIndex]);
        } else {
          for (let k = j + 1; k < end; k++) {
            combs.push([i, j, k, lastIndex]);
          }
        }
      }
    }
  }

  return combs;
}
