import { useEffect, useCallback } from "react";

export default function useMountListeners(props) {
  const {
    dispatch,
    isMenuOpen,
    compressor,
    data,
    keysCB = () => {},
    scrollCB = () => {},
  } = props;

  const keys = useCallback(handleKeys, [compressor, isMenuOpen, data]);
  const scroll = useCallback(handleScroll, [compressor, isMenuOpen, data]);

  useEffect(() => {
    document.addEventListener("keydown", keys);
    document.addEventListener("wheel", scroll);
    return () => {
      document.removeEventListener("keydown", keys);
      document.removeEventListener("wheel", scroll);
    };
  }, [keys, scroll]);

  function handleScroll({ deltaY, buttons }) {
    if (isMenuOpen) return;
    const compressChange = (deltaY / 100) * 0.03;
    const compressorVal = compressChange + compressor;
    // SETS MIN AND MAX COMPRESSOR VALUES
    const newCom = compressorVal < 0.02 ? 0 : compressorVal > 2.48 ? 2.5 : compressorVal;
    // SCROLL W/ CLICK-HOLDS
    if (!!buttons) {
      // EXTRA LOGIC FROM GAMES HERE - remember to use return in this function
      scrollCB(compressChange);
    }
    // SCROLL W/O CLICK-HOLDS
    dispatch({ type: "Compressor", compressor: newCom });
  }

  function handleKeys(e) {
    if (isMenuOpen) return;
    if (e.keyCode === 38)
      return dispatch({ type: "Compressor", compressor: compressor - 0.03 });
    if (e.keyCode === 40)
      return dispatch({ type: "Compressor", compressor: compressor + 0.03 });
    keysCB(e);
  }
}