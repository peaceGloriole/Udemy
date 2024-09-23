import Header from "./Header";
import MainComp from "./MainComp";

import questions from "./data/questions.json" assert { type: "json" };

function App() {
  return (
    <div className="app">
      <Header />
      <MainComp>
        <p>1/15</p>
      </MainComp>
    </div>
  );
}

export default App;
