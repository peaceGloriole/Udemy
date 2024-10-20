import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

export default function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{questions[index].question}</h4>

      <Options question={question} />
    </div>
  );
}
