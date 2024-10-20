import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { numQuestions, index, points, maxPossiblePoints } = useQuiz();
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
