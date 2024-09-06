export default function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>No items packed yet</em>
      </footer>
    );
  }

  const newItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage =
    newItems === 0 ? 0 : Math.round((packedItems / newItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "All done!"
          : `You have ${newItems} items on your list and you already packed ${packedItems} (${packedPercentage}%)`}
      </em>
    </footer>
  );
}
