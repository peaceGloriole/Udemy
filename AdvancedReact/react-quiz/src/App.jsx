import { useEffect, useReducer } from "react";

import Header from "./Header";
import MainComp from "./MainComp";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: `loading`,
};

function reducer(state, action) {
  switch (action.type) {
    case `dataReceived`:
      return { ...state, questions: action.payload, status: `ready` };
    case `dataFailed`:
      return { ...state, status: `error` };
    default:
      throw new Error(`Action unknown`);
  }
}

function App() {
  const [{ question, status }, dispatch] = useReducer(reducer, initialState);

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
        {status === `ready` && <StartScreen />}
      </MainComp>
    </div>
  );
}

export default App;
