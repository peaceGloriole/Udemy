import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const QuizContext = createContext();

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
    case `newAnswer`: {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
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

function QuizProvider({ children }) {
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
      .catch(() => dispatch({ type: `dataFailed` }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        seconds,
        dispatch,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error(`useQuiz must be used within a QuizProvider`);
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
