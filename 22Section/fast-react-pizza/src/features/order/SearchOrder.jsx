import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState(``);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      return;
    }

    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Потърси твоята поръчка"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mr-2 w-28 rounded-xl px-3 py-1 text-sm transition-all duration-300 placeholder:text-stone-900 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
      <button>Търси</button>
    </form>
  );
}
