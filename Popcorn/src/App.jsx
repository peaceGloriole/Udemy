import { useEffect, useState } from "react";

import NavBar from "./Components/NavBar";
import Main from "./Components/Main";
import Search from "./Components/NavBar/Search";
import FoundResults from "./Components/NavBar/FoundResults";
import Box from "./Components/LeftBox/LeftBox";
import LeftMovieRender from "./Components/LeftBox/LeftMovieRender/LeftMovieRender";
import Summary from "./Components/RightBox/Summary/Summary";
import RightMovieRender from "./Components/RightBox/RightMovieRender/RightMovieRender";
import Loader from "./Components/LeftBox/Loader";
import Error from "./Components/Error";
import MovieDetails from "./Components/MovieDetails";

const key = "6800be64";

export default function App() {
  const [query, setQuery] = useState("");
  const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`;
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(``);
  const [selecetedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((s) => (s === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((m) => [...m, movie]);
  };

  const handleDeleteMovie = (id) => {
    setWatched((m) => m.filter((m) => m.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem(`watched`, JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(``);

        const response = await fetch(BASE_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch data!");
        }

        const data = await response.json();

        if (data.Response === "False") {
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

    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <FoundResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <LeftMovieRender
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <Error message={error} />}
        </Box>

        <Box>
          {selecetedId ? (
            <MovieDetails
              selectedId={selecetedId}
              onClose={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <RightMovieRender
                onDelete={handleDeleteMovie}
                onSelectMovie={handleSelectMovie}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
