import { useReducer, useEffect, useRef } from "react";
import useFirstRun from "./useFirstRun";

// SETS INITIAL AND UPDATED DATA FOR GAMES
export default function useData(reducer, init, ...data) {
  // PRIMARY CAN EITHER BE vocabulary OR expressions
  // - it depends on the game's primary data source
  // SECONDARY CAN ONLY BE expressions
  const [primary, secondary] = data;
  const [state, dispatch] = useReducer(reducer, primary, init);
  const { isVocab } = state;
  const isFirstRun = useFirstRun();
  const didUpdate = useRef(false);

  useEffect(() => {
    if (isFirstRun) return;
    didUpdate.current = true;
    const newData = isVocab === undefined ? primary : isVocab ? primary : secondary;
    dispatch({ type: "Set_Data", data: newData });
  }, [dispatch, primary, secondary]);

  useEffect(() => {
    if (isFirstRun) return;
    didUpdate.current = false;
  }, [didUpdate.current]);

  return [state, dispatch, didUpdate.current];
}
