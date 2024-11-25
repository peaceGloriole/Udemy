import { useState } from "react";

export default function SearchOrder() {
  const [query, setQuery] = useState(``);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search your order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
