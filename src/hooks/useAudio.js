import { useRef, useEffect, useCallback } from "react";

// https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
export default function useAudio(url, loop) {
  const audio = useRef(null);

  useEffect(() => {
    if (audio.current === null) {
      audio.current = new Audio(url);
      audio.current.loop = loop;
    }
  }, [url, loop]);

  const reset = useCallback(() => {
    audio.current.pause();
    audio.current.currentTime = 0;
    audio.current.volume = 1;
  }, []);

  return [audio, reset];
}
