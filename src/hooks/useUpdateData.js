import { useEffect } from "react";

export default function useUpdateData(dataUpdated, handleGameRef) {
  useEffect(() => {
    if (!dataUpdated) return;
    handleGameRef();
  }, [handleGameRef, dataUpdated]);
}
