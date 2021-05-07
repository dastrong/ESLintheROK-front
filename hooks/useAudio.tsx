import { useRef, useEffect, useCallback, MutableRefObject } from 'react';

// https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
export default function useAudio(
  url: string,
  loop = false
): [MutableRefObject<HTMLAudioElement>, () => void] {
  const audio = useRef(null);

  useEffect(() => {
    if (audio.current === null) {
      audio.current = new Audio(url);
      audio.current.loop = loop;
    }
    // if the component is unmounted stop the audio from playing
    return () => audio.current.pause();
  }, [url, loop]);

  const reset = useCallback(() => {
    audio.current.pause();
    audio.current.currentTime = 0;
    audio.current.volume = 1;
  }, []);

  return [audio, reset];
}
