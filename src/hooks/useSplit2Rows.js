import { useMemo } from "react";
import { throwError } from "../helpers/gameUtils";

export default function useSplit2Rows(refs, gameData, chunk = 2) {
  return useMemo(() => splitArrAddRef(refs, gameData, chunk), [refs, gameData, chunk]);
}

// used to split game data into smaller arrays to map over later
// splits an array into chunks and attaches a ref
// returns an array containing equal lengthed arrays of ref/text combos
function splitArrAddRef(refs, arr, chunk) {
  if (arr.length !== refs.length) {
    throwError("The given refs and array have different lengths. They should be equal.");
  }
  if (arr.length % chunk !== 0) {
    throwError("You created uneven chunks. They should be equal.");
  }
  const splitArr = arr.reduce((acc, cVal, i) => {
    // create an obj with the ref and text
    const val = { text: cVal, ref: refs[i] };
    // first time through; create our outer and first inner array
    if (!acc) return [[val]];
    // determine if we need to add to the last chunk or start a new one
    if (i % chunk === 0) {
      acc.push([val]);
    } else {
      const lastIndex = acc.length - 1;
      acc[lastIndex].push(val);
    }
    return acc;
  }, null);

  return splitArr ? splitArr : [];
}
