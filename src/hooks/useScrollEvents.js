import { useEffect, useCallback } from "react";

export default function useScrollEvents(...props) {
  // first indx - object of functions used below
  // second inx - array of variables used in handleGame that depend on
  const [{ dispatch, scrollCB }, ...vars] = props;
  const [isMenuOpen, compressor] = vars;
  const scroll = useCallback(handleScroll, vars);

  useEffect(() => {
    document.addEventListener("wheel", scroll);
    return () => {
      document.removeEventListener("wheel", scroll);
    };
  }, [scroll]);

  function handleScroll({ deltaY, buttons }) {
    if (isMenuOpen) return;
    const compressChange = deltaY < 0 ? -0.03 : 0.03;
    const compressorVal = compressChange + compressor;
    // SETS MIN AND MAX COMPRESSOR VALUES
    const newCom = compressorVal < 0.02 ? 0 : compressorVal > 2.48 ? 2.5 : compressorVal;
    // SCROLL W/ CLICK-HOLDS
    if (!!buttons) {
      // EXTRA LOGIC FROM GAMES HERE
      if (!scrollCB) return;
      return scrollCB(compressChange);
    }
    // SCROLL W/O CLICK-HOLDS
    dispatch({ type: "Compressor", compressor: newCom });
  }
}
