import { useQuiz } from "./context/QuizContext";

function Progress() {
  const {
    index,
    answer,
    points,

    numQuestions,
    maxQuestionPoint,
  } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question
        <strong>
          {" "}
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        {points}/{maxQuestionPoint}
      </p>
    </header>
  );
}

export default Progress;
