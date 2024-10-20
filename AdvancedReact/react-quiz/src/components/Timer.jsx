import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { seconds, dispatch } = useQuiz();
  const mins = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: `tick` });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && `0`}
      {mins}:{second < 10 && `0`}
      {second} time left
    </div>
  );
}
