export default function FinishScreen({
  points,
  maxPossiblePoints,
  dispatch,
  highscore,
}) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} points!
        ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: `restart` })}
      >
        Restart the Quiz
      </button>
    </>
  );
}
