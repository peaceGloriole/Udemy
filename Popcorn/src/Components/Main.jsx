import LeftBox from "./LeftBox/LeftBox";
import RightBox from "./RightBox/RightBox";

export default function Main({ movies }) {
  return (
    <main className="main">
      <LeftBox movies={movies} />

      <RightBox />
    </main>
  );
}
