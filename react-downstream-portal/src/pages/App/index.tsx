import "./index.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { createContext, useState } from "react";
import { useTerminal } from "../../views/Terminal";

// 利用者側にいろいろなラッパーを持たせる
export const TerminalContext = createContext<
  [() => JSX.Element, { userName: string }] | undefined
  // or
  // [ReturnType<typeof useTerminal>[0], { userName: string }] | undefined
  // If you intercept event.
  // [() => JSX.Element, { userName: string }] | undefined
  // or
  // [ReturnType<typeof useTerminal>[0], { userName: string }] | undefined
  // It's OK you decide not to supply userName. Up to you.
  // () => JSX.Element | undefined
  // or
  // ReturnType<typeof useTerminal>[0] | undefined
>(undefined);

export function App() {
  const [renderTerminal] = useTerminal();
  // If you intercept event where calling hook, add args to hook!
  // const [renderTerminal] = useTerminal({ changeContent: () => {} });
  // If you use value.
  // const [renderTerminal, values] = useTerminal();

  const viewModel = useViewModel();

  return (
    <TerminalContext.Provider
      value={[
        () => renderTerminal({ userName: viewModel.userName }),
        { userName: viewModel.userName },
      ]}
      // or
      // value={[renderTerminal], { userName: viewModel.userName }}
      // If TerminalContext doesn't provide userName. Up to you.
      // value={() => renderTerminal({ userName: viewModel.userName })}
      // or
      // value={renderTerminal}
    >
      <View {...viewModel} />
    </TerminalContext.Provider>
  );
}

// TODO Find good name
const useViewModel = () => {
  const [userName, setUserName] = useState("John");
  return { userName, setUserName };
};

const View = ({ userName, setUserName }: ReturnType<typeof useViewModel>) => (
  <div className="App-base">
    <Header userName={userName} onChangeUserName={setUserName} />
    <Content userName={userName} />
  </div>
);
