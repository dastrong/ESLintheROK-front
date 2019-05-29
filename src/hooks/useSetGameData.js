import { useEffect, useReducer } from "react";

export default function useSetGameData(props) {
  const { reducer, initialState, vocabulary, expressions } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("game state data set from props");
    dispatch({ type: "", vocabulary, expressions });
  }, [dispatch, vocabulary, expressions]);

  return [state, dispatch];
}
