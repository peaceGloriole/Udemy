import WatchedMovie from "./Movie/watchedMovie";

export default function RightMovieRender({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbRating}
          movie={movie}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
