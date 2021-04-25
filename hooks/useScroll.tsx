import { useCallback } from 'react';
import useEventListener from 'hooks/useEventListener';
import { useStore } from 'contexts/store';

// cb contains game specific key events
export default function useScroll(
  cb: (scrolledUp: boolean, wheelClicked: boolean) => void
) {
  const { isSidebarOpen } = useStore();

  const handleScroll = useCallback(
    ({ deltaY, buttons }) => {
      if (isSidebarOpen) return;
      const scrolledUp = deltaY < 0;
      const wheelClicked = buttons === 4;
      cb(scrolledUp, wheelClicked);
    },
    [isSidebarOpen, cb]
  );

  useEventListener('wheel', handleScroll);
}
