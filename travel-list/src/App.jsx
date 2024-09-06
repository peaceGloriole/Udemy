import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  // set delete function in App for global state and pass it to the PackingList component
  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheck = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        check={handleCheck}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState(``);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);

    setDescription(``);
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your travel ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, check }) {
  //receive the props and pass it to the item component
  return (
    <div className="list">
      <ol>
        {items.map((el) => (
          <Item check={check} item={el} deleteItem={onDeleteItem} key={el.id} />
        ))}
      </ol>
    </div>
  );
}

function Item({ item, deleteItem, check }) {
  //receive the props and use it in onClick event. For delete it needs to be () => otherwise it execute immediately
  //receive global state via props for check function
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => check(item.id)}
      />
      <span style={item.packed ? { textDecoration: `line-through` } : {}}>
        {item.description} - {item.quantity}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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

export default App;
