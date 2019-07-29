import { useCallback } from "react";
import useEventListener from "./useEventListener";

// cb contains game specific key events
export default function useKeys(isMenuOpen, handleGame, cb) {
  const handleKeys = useCallback(
    e => {
      if (isMenuOpen) return;
      if (e.keyCode === 32 || e.keyCode === 13) return handleGame();
      if (!cb) return;
      cb(e);
    },
    [isMenuOpen, handleGame, cb]
  );

  useEventListener("keydown", handleKeys);
}
