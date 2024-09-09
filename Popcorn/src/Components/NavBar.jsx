import FoundResults from "./NavBar/FoundResults";
import Logo from "./NavBar/Logo";
import Search from "./NavBar/Search";

export default function NavBar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <FoundResults movies={movies} />
    </nav>
  );
}
