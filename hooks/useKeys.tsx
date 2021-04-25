import { useCallback } from 'react';
import { useStore } from 'contexts/store';
import useEventListener from './useEventListener';

// cb contains game specific key events
export default function useKeys(
  handleGame: () => void,
  cb?: (e: KeyboardEvent) => void
): void {
  const { isSidebarOpen } = useStore();

  const handleKeys = useCallback(
    (e: KeyboardEvent) => {
      if (isSidebarOpen) return;
      if (e.code === 'Space' || e.key === 'Enter') return handleGame();
      if (!cb) return;
      cb(e);
    },
    [isSidebarOpen, handleGame, cb]
  );

  useEventListener('keydown', handleKeys);
}
