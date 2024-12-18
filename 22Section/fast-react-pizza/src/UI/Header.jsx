import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-stone-700 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="text-center font-extrabold tracking-[8px]">
        Бързата Пица.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}
