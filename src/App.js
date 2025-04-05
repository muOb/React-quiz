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
import { useQuiz } from "./components/context/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Qquestion />
            <Fotter>
              <NextQustion />
              <Timer />
            </Fotter>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
