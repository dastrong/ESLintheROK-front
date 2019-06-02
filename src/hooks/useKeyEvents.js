import { useEffect, useCallback } from "react";

export default function useKeyEvents(...props) {
  // first indx - object of functions used below
  // second inx - array of variables used in handleGame that depend on
  const [{ dispatch, keysCB }, ...vars] = props;
  const [isMenuOpen, compressor] = vars;
  const keys = useCallback(handleKeys, vars);

  useEffect(() => {
    document.addEventListener("keydown", keys);
    return () => {
      document.removeEventListener("keydown", keys);
    };
  }, [keys]);

  function handleKeys(e) {
    if (isMenuOpen) return;
    if (e.keyCode === 38)
      return dispatch({ type: "Compressor", compressor: compressor - 0.03 });
    if (e.keyCode === 40)
      return dispatch({ type: "Compressor", compressor: compressor + 0.03 });
    if (!keysCB) return;
    keysCB(e);
  }
}
