import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { css, injectGlobal, keyframes } from "@emotion/css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" className={anchorStyle}>
          <img src="/vite.svg" className={logoStyle} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" className={anchorStyle}>
          <img
            src={reactLogo}
            className={`${logoStyle} ${reactLogoStyle}`}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={cardStyle}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={readTheDocsStyle}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

injectGlobal`
  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
`;

const logoStyle = css`
  height: 6em;
  padding: 1.5em;
  will-change: filter;

  :hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const reactLogoStyle = css`
  ${logoStyle};

  :hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const anchorStyle = css`
  :nth-of-type(2) ${`.${logoStyle}`} {
    animation: ${logoSpin} infinite 20s linear;
  }
`;

const cardStyle = css`
  padding: 2em;
`;

const readTheDocsStyle = css`
  color: #888;
`;
