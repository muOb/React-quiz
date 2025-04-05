import { useQuiz } from "./context/QuizContext";

function NextQustion() {
  const { index, answer, numQuestions, dispatch } = useQuiz();
  if (answer === null) return;
  return (
    <>
      <p>
        {index < numQuestions - 1 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQ" })}
          >
            Next
          </button>
        )}
      </p>

      <p>
        {index === numQuestions - 1 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finished" })}
          >
            Finish
          </button>
        )}
      </p>
    </>
  );
}

export default NextQustion;
