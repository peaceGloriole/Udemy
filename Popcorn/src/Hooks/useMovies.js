import { useState } from "react";
import { useEffect } from "react";

const key = `6800be64`;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(``);

  const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`;

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(``);

        const response = await fetch(BASE_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Failed to fetch data!`);
        }

        const data = await response.json();

        if (data.Response === `False`) {
          throw new Error(`Movie not found!`);
        }

        setMovies(data.Search);
        setError(``);
      } catch (error) {
        if (error.name !== `AbortError`) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
