import { useEffect } from "react";

export default function useEventListener(type, cb) {
  useEffect(() => {
    document.addEventListener(type, cb);
    return () => {
      document.removeEventListener(type, cb);
    };
  }, [type, cb]);
}
