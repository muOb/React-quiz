import Options from "./Options";
function Qquestion({ question, answer, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Qquestion;
