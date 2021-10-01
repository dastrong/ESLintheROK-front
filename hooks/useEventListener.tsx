import { useEffect } from 'react';

export default function useEventListener(
  type: keyof DocumentEventMap,
  cb: (e: Event) => void
) {
  useEffect(() => {
    document.addEventListener(type, cb);
    return () => {
      document.removeEventListener(type, cb);
    };
  }, [type, cb]);
}
