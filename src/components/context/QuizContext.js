import { createContext, useContext, useEffect, useReducer } from "react";

const secs_per_question = 30;
const initialstate = {
  questions: [],
  //'loading','error','ready','active',finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highPoint: 0,
  secondRemaining: 10,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * secs_per_question,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQ":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highPoint:
          state.points < state.highPoint ? state.highPoint : state.points,
      };
    case "restart":
      return {
        //anouther way
        // ...initialstate,
        // questions: state.questions,
        // status: "active",
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        secondRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unKnown");
  }
}
const QuizContext = createContext();
function QuizProvider({ children }) {
  //distruction state
  const [
    { status, questions, index, answer, points, highPoint, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialstate);
  const numQuestions = questions.length;
  const maxQuestionPoint = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const question = questions[index];

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highPoint,
        secondRemaining,
        numQuestions,
        maxQuestionPoint,
        dispatch,
        question,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of QuizPorvider");
  return context;
}
export { QuizProvider, useQuiz };
