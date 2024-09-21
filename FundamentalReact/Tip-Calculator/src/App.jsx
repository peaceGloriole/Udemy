import { useState } from "react";
import "./App.css";

import Calculator from "./components/Calculator";

function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  const tipAmount = bill * ((tip + friendTip) / 2 / 100).toFixed(2);

  const handleReset = () => {
    setBill(0);
    setTip(0);
    setFriendTip(0);
  };

  return (
    <div>
      <Calculator
        handleReset={handleReset}
        bill={bill}
        onSetBill={setBill}
        tip={tip}
        onSetTip={setTip}
        friendTip={friendTip}
        onSetFriendTip={setFriendTip}
        tipAmount={tipAmount}
      />
    </div>
  );
}

export default App;
