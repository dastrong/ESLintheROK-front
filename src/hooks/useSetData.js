import { useReducer, useEffect } from "react";

export default function useSetData(reducer, data, init) {
  const [state, dispatch] = useReducer(reducer, data, init);

  useEffect(() => {
    dispatch({ type: "Set_Data", data });
  }, [dispatch, data]);

  return [state, dispatch];
}
