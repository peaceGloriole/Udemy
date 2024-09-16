export default function MovieDetails({ selectedId, onClose }) {
  return (
    <div className="details">
      <button className="btn-back" onClick={() => onClose()}>
        -
      </button>
      {selectedId}
    </div>
  );
}
