import { useCallback } from 'react';
import useEventListener from 'hooks/useEventListener';

// cb contains game specific key events
export default function useScroll(
  isMenuOpen: boolean,
  cb: (scrolledUp: boolean, wheelClicked: boolean) => void
) {
  const handleScroll = useCallback(
    ({ deltaY, buttons }) => {
      if (isMenuOpen) return;
      const scrolledUp = deltaY < 0;
      const wheelClicked = buttons === 4;
      cb(scrolledUp, wheelClicked);
    },
    [isMenuOpen, cb]
  );

  useEventListener('wheel', handleScroll);
}
