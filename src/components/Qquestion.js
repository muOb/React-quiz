import { useQuiz } from "./context/QuizContext";
import Options from "./Options";
function Qquestion() {
  const { question } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Qquestion;
