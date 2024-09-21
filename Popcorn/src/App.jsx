import { useState } from "react";

import { useMovies } from "./Hooks/useMovies";
import { useLocalStorage } from "./Hooks/useLocalStorage";

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

export default function App() {
  const [query, setQuery] = useState(``);
  const [selecetedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const { watched, setWatched } = useLocalStorage();

  const handleSelectMovie = (id) => {
    setSelectedId((s) => (s === id ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((m) => [...m, movie]);
  };

  const handleDeleteMovie = (id) => {
    setWatched((m) => m.filter((m) => m.imdbID !== id));
  };

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
