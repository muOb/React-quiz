function NextQustion({ dispatch, answer, numQuestions, index }) {
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
