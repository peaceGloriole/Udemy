import { useState } from "react";

import Item from "./Item";
import SortBy from "./SortBy";

export default function PackingList({
  items,
  onDeleteItem,
  check,
  handleClearList,
}) {
  //receive the props and pass it to the item component
  const [sortBy, setSortBy] = useState(`input`);

  let sortItems;

  if (sortBy === "description")
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "packed")
    sortItems = items.slice().sort((a, b) => a.packed - b.packed);
  else sortItems = items;

  return (
    <div className="list">
      <ol>
        {sortItems.map((el) => (
          <Item check={check} item={el} deleteItem={onDeleteItem} key={el.id} />
        ))}
      </ol>
      {items.length > 0 && (
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <SortBy />
          </select>
          <button onClick={() => handleClearList()}>Clear List</button>
        </div>
      )}
    </div>
  );
}
