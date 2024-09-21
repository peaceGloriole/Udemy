import { useEffect, useState } from "react";
import Star from "../Star";
import Loader from "./LeftBox/Loader";
import { useKeyListener } from "../Hooks/useKeyListener";

const key = `6800be64`;

// eslint-disable-next-line react/prop-types
export default function MovieDetails({ selectedId, onClose, onAddWatched }) {
  const BASE_URL = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useKeyListener(`Escape`, onClose);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const onAdd = () => {
    const watchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(` `).at(0)),
    };

    onAddWatched(watchedMovie);
    onClose();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId, BASE_URL]);

  useEffect(() => {
    if (!title) {
      return;
    }

    document.title = `Movie - ${title}`;

    return () => {
      document.title = `Popcorn`;
    };
  }, [title]);

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
            <img src={poster} alt={`Poster of ${movie} Movie`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span role="img" aria-label="star">
                  ⭐
                </span>
                {imdbRating} IMBd rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <Star maxRating={10} size={24} />

              <button className="btn-add" onClick={onAdd}>
                Add to Watch List
              </button>
            </div>
            <p>{plot}</p>
            <p>Starring {actors}</p>
            <p>Directed by : {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
