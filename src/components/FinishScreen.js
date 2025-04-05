import { useQuiz } from "./context/QuizContext";

function FinishScreen() {
  const {
    points,
    highPoint,

    maxQuestionPoint,
    dispatch,
  } = useQuiz();
  const precentege = (points / maxQuestionPoint) * 100;
  let emoji;
  if (precentege === 100) emoji = "🥇";
  if (precentege >= 80 && precentege < 100) emoji = "😎";
  if (precentege >= 50 && precentege < 80) emoji = "🙂";
  if (precentege >= 0 && precentege < 50) emoji = "🫠";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points} </strong>out of{" "}
        {maxQuestionPoint} ({Math.ceil(precentege)}%)
      </p>
      <p className="highscore">(Highscore: {highPoint} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
