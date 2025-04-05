import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Qquestion from "./components/Qquestion";
import NextQustion from "./components/NextQustion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Fotter from "./components/Fotter";
import Timer from "./components/Timer";
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
export default function App() {
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

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              answer={answer}
              numQuestions={numQuestions}
              points={points}
              maxQuestionPoint={maxQuestionPoint}
            />
            <Qquestion
              index={index}
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Fotter>
              <NextQustion
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
            </Fotter>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxQuestionPoint={maxQuestionPoint}
            points={points}
            highPoint={highPoint}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
