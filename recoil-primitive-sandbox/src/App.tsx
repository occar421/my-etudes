import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { atom, selector, useRecoilValue } from "recoil";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {count > 0 ? (
        <p>
          <RateText />
        </p>
      ) : null}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

const fetchUsdRate = async () => {
  const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const data = await res.json();
  return data.bpi.USD.rate_float as number;
};

const usdRateState = atom({
  key: "usdRateState",
  default: selector({
    key: "usdRateState/Default",
    get: () => fetchUsdRate(), // だと最初の読み取り時に取得する。
  }),
  // default: fetchUsdRate(), だとファイルの読み込みと同時に取得する。
  // default: fetchUsdRate, だとそのまま Promise が返る。
});

const RateText = () => {
  const rate = useRecoilValue(usdRateState);

  return <span>1 BTC = {rate} USD</span>;
};
