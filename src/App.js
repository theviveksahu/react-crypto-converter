import { useEffect, useState } from "react";
import "./styles.css";

const URL = `https://api.frontendeval.com/fake/crypto`;

const App = () => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [currencyValue, setCurrencyValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    prev: 0,
    curr: 0
  });

  const handleCurrencyValueChange = (e) => {
    setLoading(true);
    setCurrencyValue(e.target.value);
  };

  const handleCurrencyCodeChange = (e) => {
    setLoading(true);
    setCurrencyCode(e.target.value);
  };

  const fetchData = async () => {
    const res = await fetch(`${URL}/${currencyCode}`);
    const data = await res.json();

    setValue((prevState) => {
      return {
        prev: prevState.curr,
        curr: data.value * currencyValue
      };
    });
    setLoading(false);
  };

  useEffect(() => {
    let intervalId;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currencyValue, currencyCode]);

  const diff = value.curr - value.prev;

  return (
    <>
      <div className="App">
        {loading && <div id="loading"></div>}
        <input
          type="text"
          numericode="decimal"
          pattern="[0-9]*.?[0-9]*"
          required
          value={currencyValue}
          onChange={handleCurrencyValueChange}
        />
        <select value={currencyCode} onChange={handleCurrencyCodeChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CNY">CNY</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      {!loading && (
        <div className="App">
          {value.curr !== 0 && <span>{value.curr.toFixed(2)} WUC</span>}
          {diff !== 0 && (
            <span className={diff > 0 ? "green" : "red"}>
              {diff.toFixed(2)}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default App;
