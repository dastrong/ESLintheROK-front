import { useRef, useEffect } from "react";

export default function useFirstRun() {
  const isFirstRun = useRef(true);

  useEffect(() => {
    isFirstRun.current = false;
  }, []);

  return isFirstRun.current;
}
