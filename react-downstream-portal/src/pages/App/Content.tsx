import "./Content.css";
import { useContext, useState } from "react";
import { Hello } from "../../views/Hello";
import { TerminalContext } from "./index";

type Pane = "hello" | "terminal";

export const Content = ({ userName }: { userName: string }) => {
  const [selectedPane, setSelectedPane] = useState<Pane>("terminal");
  const [Terminal] = useContext(TerminalContext)!;
  // or
  // const [Terminal, values] = useContext(TerminalContext)!;

  return (
    <main className="Content-base">
      <nav className="Content-tabs">
        <button onClick={() => setSelectedPane("hello")}>Hello</button>
        <button onClick={() => setSelectedPane("terminal")}>Terminal</button>
      </nav>
      <div className="Content-pane">
        {selectedPane === "hello" ? (
          <Hello userName={userName} />
        ) : (
          <Terminal />
          // If you intercept event.
          // <TerminalView
          //   changeContent={changeContent}
          //   {...terminalHookValues}
          // />
          // If TerminalContext doesn't provide userName. Up to you.
          // <Terminal userName={userName} />
        )}
      </div>
    </main>
  );
};
