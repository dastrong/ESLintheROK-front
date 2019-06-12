import { useEffect, useCallback } from "react";

export default function useScroll(cb, dispatch, isMenuOpen, compressor) {
  const handleScroll = useCallback(
    ({ deltaY, buttons }) => {
      if (isMenuOpen) return;
      const compressChange = deltaY < 0 ? -0.03 : 0.03;
      const newCompress = compressChange + compressor;
      // SETS MIN AND MAX COMPRESSOR VALUES
      const newCom = newCompress < 0.02 ? 0 : newCompress > 2.48 ? 2.5 : newCompress;
      // SCROLL W/ CLICK-HOLDS
      if (!!buttons) {
        // EXTRA LOGIC FROM GAMES HERE
        if (!cb) return;
        return cb(compressChange);
      }
      // SCROLL W/O CLICK-HOLDS
      dispatch({ type: "Compressor", compressor: newCom });
    },
    [cb, dispatch, isMenuOpen, compressor]
  );

  useEffect(() => {
    document.addEventListener("wheel", handleScroll);
    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);
}
