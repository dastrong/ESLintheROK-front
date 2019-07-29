import { useCallback } from "react";
import useEventListener from "./useEventListener";

// cb contains game specific key events
export default function useScroll(isMenuOpen, cb) {
  const handleScroll = useCallback(
    ({ deltaY, buttons }) => {
      if (isMenuOpen) return;
      const scrolledUp = deltaY < 0;
      const wheelClicked = buttons === 4;
      cb(scrolledUp, wheelClicked);
    },
    [isMenuOpen, cb]
  );

  useEventListener("wheel", handleScroll);
}
