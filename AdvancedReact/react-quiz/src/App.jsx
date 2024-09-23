import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import MainComp from "./components/MainComp";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: `loading`,
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case `dataReceived`:
      return { ...state, questions: action.payload, status: `ready` };
    case `dataFailed`:
      return { ...state, status: `error` };
    case `start`:
      return { ...state, status: `active` };
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
    default:
      throw new Error(`Action unknown`);
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

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
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </MainComp>
    </div>
  );
}

export default App;
