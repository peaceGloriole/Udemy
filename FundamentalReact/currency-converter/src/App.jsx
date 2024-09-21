import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(`EUR`);
  const [toCurrency, setToCurrency] = useState(`USD`);
  const [converted, setConverted] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

  useEffect(() => {
    const convert = async () => {
      setIsLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();

      setConverted(data.rates[toCurrency]);
      setIsLoading(false);
    };

    if (fromCurrency === toCurrency) return setConverted(amount);

    convert();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>
        {converted} {toCurrency}
      </p>
    </div>
  );
}

export default App;

function Loader() {
  return <p>Loader..</p>;
}
