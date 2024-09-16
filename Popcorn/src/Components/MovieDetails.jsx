import { useEffect, useState } from "react";
import Star from "../Star";
import Loader from "./Loader";

const key = "6800be64";

export default function MovieDetails({ selectedId, onClose }) {
  const BASE_URL = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  // There is a 2 components in the jsx

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie} Movie`} />

            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span role="img" aria-label="star">
                  ⭐
                </span>
                {movie.imdbRating} IMBd rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <Star maxRating={10} size={24} />
            </div>
            <p>{movie.Plot}</p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by : {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
