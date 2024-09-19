import WatchedMovie from "./Movie/watchedMovie";

export default function RightMovieRender({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbRating} movie={movie} />
      ))}
    </ul>
  );
}
