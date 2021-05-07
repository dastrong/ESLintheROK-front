import shuffle from 'lodash.shuffle';

export function throwError(msg: string) {
  throw new Error(`Error: ${msg}`);
}

export function getRandoNum(max: number, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

// filters out strings that include the things in the filtered list
export function filterData(
  dataArray: string[],
  filter: boolean,
  extraFilters: string[] = []
) {
  if (!filter) return dataArray;

  const filteredList = ['_', '...', ...extraFilters];
  return dataArray.filter(dataStr =>
    filteredList.some(filter => dataStr.includes(filter))
  );
}

// used to get the next set of data for our gameData arrays
export function nextRoundData(
  count: number,
  remainingData: string[],
  fullData: string[],
  verifyData = false
): [current: string[], future: string[]] {
  // check if there's enough data for another round
  const sufficientData = count <= remainingData.length;
  // if there isn't enough data for the next round, ...
  // ... refresh all data, filter (if needed) and shuffle it
  const data = sufficientData
    ? [...remainingData]
    : shuffle(filterData(fullData, verifyData));
  // get 'count' amount of data for the next round
  const currentRoundData = data.splice(0, count);
  // returns this rounds data and the next rounds data
  return [currentRoundData, data];
}

// returns a random linear gradient string
export function getRandoGrad() {
  const deg = getRandoNum(360);
  const st = getHSL();
  const nd = getHSL();
  const rd = getHSL();
  return `linear-gradient(${deg}deg, ${st}, ${nd}, ${rd})`;
}

// creates an array of random numbers within the parameters given
// can be unique if needed
export function arrOfRandoNum(
  max: number, // max value
  min: number, // min value
  length: number, // length of the array
  unique = false // can specify if you need unique values (as always possible)
) {
  if (min > max) {
    throwError('Min cannot be higher than the max');
  }
  if (unique && max - min < length - 1) {
    throwError('Unique Error. Length cannot be lower than the max number');
  }
  const arr = [];
  while (arr.length < length) {
    const randoNum = getRandoNum(max, min);
    if (unique) {
      if (arr.indexOf(randoNum) === -1) {
        arr.push(randoNum);
      }
    } else {
      arr.push(randoNum);
    }
  }
  return arr;
}

// returns a random HSL string
// not exported since it's only used in getRandoGrad above currently
function getHSL() {
  const hue = getRandoNum(360);
  const sat = getRandoNum(100, 80);
  const lig = getRandoNum(70, 60);
  return `hsl(${hue}, ${sat}%, ${lig}%)`;
}
