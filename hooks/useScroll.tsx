import { useCallback } from 'react';
import { useStore } from 'contexts/store';
import { useGifs } from 'contexts/gifs';
import useEventListener from 'hooks/useEventListener';

// cb contains game specific key events
export default function useScroll(
  cb: (scrolledUp: boolean, wheelClicked: boolean) => void
) {
  const { isMenuOpen, dataModalName, showSettings } = useStore();
  const { show } = useGifs();

  const handleScroll = useCallback(
    ({ deltaY, buttons }) => {
      if (isMenuOpen || dataModalName || showSettings || show) return;
      const scrolledUp = deltaY < 0;
      const wheelClicked = buttons === 4;
      cb(scrolledUp, wheelClicked);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMenuOpen, cb]
  );

  useEventListener('wheel', handleScroll);
}
