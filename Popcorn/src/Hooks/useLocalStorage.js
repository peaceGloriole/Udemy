import { useEffect, useState } from "react";

export function useLocalStorage() {
  const [watched, setWatched] = useState(() => {
    const storedMovies = localStorage.getItem(`watched`);
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem(`watched`, JSON.stringify(watched));
  }, [watched]);

  return { watched, setWatched };
}
