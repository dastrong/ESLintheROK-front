import { useEffect, useCallback } from "react";

export default function useKeys(cb, dispatch, isMenuOpen, compressor) {
  const handleKeys = useCallback(
    e => {
      if (isMenuOpen) return;
      if (e.keyCode === 38)
        return dispatch({ type: "Compressor", compressor: compressor - 0.03 });
      if (e.keyCode === 40)
        return dispatch({ type: "Compressor", compressor: compressor + 0.03 });
      if (!cb) return;
      cb(e);
    },
    [cb, dispatch, isMenuOpen, compressor]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeys);
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  }, [handleKeys]);
}
