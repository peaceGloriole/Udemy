export default function Reset({ bill, onReset }) {
  return (bill > 0) ? <button onClick={onReset}>Reset</button> : null;
}
