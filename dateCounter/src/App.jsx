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

  return (
    <div className="App">
      <div>
        <button onClick={handleDecrement}>-</button>
        <span> Step : {step} </span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <div>
        <button onClick={handleDecrementCount}>-</button>
        <span> Count : {count} </span>
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
    </div>
  );
}

export default App;
