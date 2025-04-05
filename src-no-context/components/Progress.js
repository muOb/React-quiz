function Progress({ index, answer, numQuestions, points, maxQuestionPoint }) {
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
