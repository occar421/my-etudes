import { useState } from "react";
import logo from "./logo.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <header
        className="bg-theme-navy min-h-screen flex flex-col items-center justify-center text-[calc(10px+2vmin)] text-white gap-y-48px"
        style={{
          fontSize: "calc(10px + 2vmin)", // because of the JIT bug
        }}
      >
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-spin animate-duration-20s motion-reduce:transition-none"
          alt="logo"
        />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            className="bg-gray-200 text-black px-2 border-gray-500 border-2 hover:bg-gray-300"
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
            className="text-theme-cyan underline"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="text-theme-cyan underline"
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
