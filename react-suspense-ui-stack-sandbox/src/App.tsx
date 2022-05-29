import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span className="text-red-500">{count}</span>
      <button
        className="border-2 border-blue-700"
        type="button"
        onClick={() => setCount((x) => ++x)}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
