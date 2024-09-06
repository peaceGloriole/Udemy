export default function Item({ item, deleteItem, check }) {
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
