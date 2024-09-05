import { useState } from "react";
import "./style.css";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const handleIncrement = () => {
    setStep(step + 1);
  };

  const handleDecrement = () => {
    setStep(step - 1);
  };

  const handleIncrementCount = () => {
    setCount(count + step);
  };

  const handleDecrementCount = () => {
    setCount(count - step);
  };

  const resetDate = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="App">
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        {/* <button onClick={handleDecrement}>-</button> */}
        <span> Step : {step} </span>
        {/* <button onClick={handleIncrement}>+</button> */}
      </div>
      <div>
        <span>Count : </span>
        <button onClick={handleDecrementCount}>-</button>
        <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value)) } />
        <span> {count} </span>
        <button onClick={handleIncrementCount}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? `Today is `
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      {(count !== 0 || step !== 1) && (
        <button onClick={resetDate}>Reset</button>
      )}
    </div>
  );
}

export default App;
