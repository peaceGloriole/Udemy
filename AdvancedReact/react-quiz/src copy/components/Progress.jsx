export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
}) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p className="points">
        <strong>
          {points} / {maxPossiblePoints} points
        </strong>
      </p>
    </div>
  );
}
