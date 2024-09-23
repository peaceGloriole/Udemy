import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import MainComp from "./components/MainComp";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SEC_PER_QUESTION = 10;

const initialState = {
  questions: [],
  status: `loading`,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case `dataReceived`:
      return { ...state, questions: action.payload, status: `ready` };
    case `dataFailed`:
      return { ...state, status: `error` };
    case `start`:
      return {
        ...state,
        status: `active`,
        seconds: state.questions.length * SEC_PER_QUESTION,
      };
    case `newAnswer`:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case `nextQuestion`:
      return { ...state, index: state.index + 1, answer: null };
    case `finish`:
      return {
        ...state,
        status: `finished`,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case `restart`:
      return { ...initialState, questions: state.questions, status: `ready` };
    case `tick`:
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? `finished` : state.status,
      };
    default:
      throw new Error(`Action unknown`);
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: `dataReceived`, payload: data }))
      .catch((error) => dispatch({ type: `dataFailed` }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainComp>
        {status === `loading` && <Loader />}
        {status === `error` && <Error />}
        {status === `ready` && (
          <StartScreen numQuest={numQuestions} dispatch={dispatch} />
        )}
        {status === `active` && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} seconds={seconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === `finished` && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </MainComp>
    </div>
  );
}

export default App;
