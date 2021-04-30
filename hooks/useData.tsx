import { useReducer, useEffect, useRef, Dispatch } from 'react';
import useFirstRun from 'hooks/useFirstRun';

// SETS INITIAL AND UPDATED DATA FOR GAMES
export default function useData(
  reducer: (prevState: any, action: any) => any,
  init: (data: string[]) => void,
  primaryData: string[], // primary can be vocabulary OR expressions
  secondaryData?: string[] // secondary must be expressions (vocab: default)
): [any, Dispatch<any>, boolean] {
  const [state, dispatch] = useReducer(reducer, primaryData, init);
  const { isVocab } = state;

  const isFirstRun = useFirstRun();
  const didUpdate = useRef(false);

  // RUNS WHEN A USER EDITS THEIR DATA IN GAME
  useEffect(() => {
    if (isFirstRun) return;
    didUpdate.current = true;
    const newData =
      isVocab || isVocab === undefined ? primaryData : secondaryData;
    dispatch({ type: 'Set_Data', data: newData });
  }, [dispatch, primaryData, secondaryData]);

  // RUNS WHEN USER SWITCHES FROM VOCABULARY TO EXPRESSIONS
  useEffect(() => {
    if (isFirstRun) return;
    if (isVocab === undefined) return;
    didUpdate.current = true;
    const newData = isVocab ? primaryData : secondaryData;
    dispatch({ type: 'Set_Data', data: newData });
  }, [dispatch, isVocab]);

  // SWITCHES THE FLAG VARIABLE BACK TO IF IT'S BEEN CHANGED
  useEffect(() => {
    didUpdate.current = false;
  }, [didUpdate.current]);

  return [state, dispatch, didUpdate.current];
}
