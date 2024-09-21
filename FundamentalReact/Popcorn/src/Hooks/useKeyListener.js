import { useEffect } from "react";

export function useKeyListener(key, callback) {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.code === key) {
        callback();
      }
    }

    document.addEventListener(`keydown`, handleKeydown);

    return () => {
      document.removeEventListener(`keydown`, handleKeydown);
    };
  }, [callback, key]);
}
