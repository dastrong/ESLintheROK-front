import { useCallback } from 'react';
import { useStore } from 'contexts/store';
import { useGifs } from 'contexts/gifs';
import useEventListener from './useEventListener';

// cb contains game specific key events
export default function useKeys(
  handleGame: () => void,
  cb?: (e: KeyboardEvent) => void
): void {
  const { isMenuOpen, dataModalName, showSettings } = useStore();
  const { show } = useGifs();

  const handleKeys = useCallback(
    (e: KeyboardEvent) => {
      if (isMenuOpen || dataModalName || showSettings || show) return;
      if (e.code === 'Space' || e.key === 'Enter') return handleGame();
      if (!cb) return;
      cb(e);
    },
    [isMenuOpen, dataModalName, showSettings, show, handleGame, cb]
  );

  useEventListener('keydown', handleKeys);
}
