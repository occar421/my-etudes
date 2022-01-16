import { useState } from "react";
import logo from "./logo.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={baseStyle}>
      <header
        w--min-h="screen"
        w--flex="~ col" // gap-y-48px after https://github.com/windicss/windicss/issues/582
        w--align="items-center"
        w--justify="content-center"
        className={`gap-y-48px ${headerStyle}`}
      >
        <img src={logo} w--h="[40vmin]" className={logoStyle} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            className={buttonStyle}
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className={linkStyle}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className={linkStyle}
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

const baseStyle = "text-center";

const headerStyle = "bg-theme-navy text-24px text-white";

const logoStyle =
  "pointer-events-none animate-spin animate-duration-20s motion-reduce:transition-none";

const linkStyle = "text-theme-cyan underline";

const buttonStyle =
  "bg-gray-200 text-black border-gray-500 border-2 px-2 text-24px hover:bg-gray-300";
