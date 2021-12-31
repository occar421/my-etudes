import { useState } from "react";
import logo from "./logo.svg";
import { css, keyframes } from "@emotion/react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <header
        css={css`
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        `}
      >
        <img
          src={logo}
          css={css`
            height: 40vmin;
            pointer-events: none;

            @media (prefers-reduced-motion: no-preference) {
              & {
                animation: ${appLogoSpin} infinite 20s linear;
              }
            }
          `}
          alt="logo"
        />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            css={css`
              font-size: calc(10px + 2vmin);
            `}
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </button>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            css={appLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            css={appLink}
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;

const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const appLink = css`
  color: #61dafb;
`;
