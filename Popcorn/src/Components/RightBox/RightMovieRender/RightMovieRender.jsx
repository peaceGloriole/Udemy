import Movie from "../../LeftBox/LeftMovieRender/Movie/Movie";

export default function RightMovieRender({ watched }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
