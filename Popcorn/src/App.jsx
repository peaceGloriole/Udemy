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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const query = `interstellar`;
const key = "6800be64";
const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMovies = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setMovies(data.Search);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Search />
        <FoundResults movies={movies} />
      </NavBar>

      <Main>
        {isLoading ? (
          <Loader />
        ) : (
          <Box element={<LeftMovieRender movies={movies} />} />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <Box
            element={
              <>
                <Summary watched={watched} />
                <RightMovieRender watched={watched} />
              </>
            }
          />
        )}
      </Main>
    </>
  );
}
