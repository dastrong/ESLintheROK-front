import shuffle from 'lodash.shuffle';

export const throwError = (msg: string) => {
  throw new Error(`Error: ${msg}`);
};

export function getRandoNum(max, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

// skip values with _ (indicating blank words) or ...
export function verifyGameData(data, isVocab, vocabulary, expressions) {
  let stateData = data;
  let gameData = '';
  let nextData = [];
  for (let i = 0; i <= data.length; i++) {
    const [[cur], nex] = nextRoundData(
      stateData,
      1,
      isVocab,
      vocabulary,
      expressions
    );
    const isAcceptable = !(cur.includes('_') || cur.includes('...'));
    if (isAcceptable) {
      gameData = cur;
      nextData = nex;
      break;
    } else {
      stateData = nex;
      nextData = nex;
    }
  }
  return [gameData, nextData];
}

// used to get the next set of data for our gameData arrays
export function nextRoundData(data, count, isVocab, vocabulary, expressions) {
  const shuffledData = () => shuffle(isVocab ? vocabulary : expressions);
  // if there isn't enough data for the next round, refresh all data and shuffle it
  const newData = count <= data.length ? [...data] : shuffledData();
  // get 'count' amount of data for the next round
  const roundD = newData.splice(0, count);
  // returns this rounds data and the next rounds data
  return [roundD, newData];
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
export function arrOfRandoNum(max, min, num, unique = false) {
  if (min > max) {
    throwError('Min cannot be higher than the max');
  }
  if (unique && max - min < num - 1) {
    throwError(
      'Cannot make a unique array, if the total length is lower than the max number'
    );
  }
  const arr = [];
  while (arr.length < num) {
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

// used for multi data games
// bails out of the dispatch to avoid unnecessary rerenders
// extras is an object of variables that you might need updated when updating isVocab
export function changeIsVocab(isVocab: boolean, state, extras) {
  if (isVocab === state.isVocab) return state;
  return { ...state, isVocab, ...extras };
}

// returns a random HSL string
// not exported since it's only used in getRandoGrad above currently
function getHSL() {
  const hue = getRandoNum(360);
  const sat = getRandoNum(100, 80);
  const lig = getRandoNum(70, 60);
  return `hsl(${hue}, ${sat}%, ${lig}%)`;
}
