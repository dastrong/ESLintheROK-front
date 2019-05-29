import { useEffect } from "react";

export default function useUpdateData(dataUpdated, dispatch) {
  useEffect(() => {
    if (!dataUpdated) return;
    dispatch({ type: "" });
  }, [dataUpdated, dispatch]);
}
