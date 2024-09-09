import { useState } from "react";
import LeftMovieRender from "./LeftMovieRender/LeftMovieRender";

export default function LeftBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <LeftMovieRender movies={movies}/>}
    </div>
  );
}
