import "./Terminal.css";
import { useState } from "react";

const useTerminalValues = () => {
  const [content, changeContent]: [
    string,
    (content: string) => void
  ] = useState("");
  // Can write logic
  return { content, changeContent };
};

type LocalProps = {
  userName: string;
};

const TerminalView = ({
  userName,
  content,
  changeContent,
}: LocalProps & ReturnType<typeof useTerminalValues>) => {
  const prefix = `${userName || "unknown"}@VirtualTerminal $ `;

  return (
    <div className="Terminal-base">
      <textarea
        className="Terminal-textarea"
        value={prefix + content}
        onChange={(event) =>
          changeContent(event.target.value.substring(prefix.length))
        }
      />
    </div>
  );
};

export const useTerminal = () => {
  // If you intercept event where calling hook, add args to hook!
  // export const useTerminal = ({ changeContent: (content: string) => void }) => {
  const values = useTerminalValues();

  return [
    (props: LocalProps) => <TerminalView {...values} {...props} />,
    { content: values.content },
  ] as const;
};

// MEMO: prop をどこで渡すべきかの問題が解決できた 両方で必要かも知れない場合には結局 values を渡すので render hook の意義が薄れる
// MEMO: コンポーネントからのイベント通知もラッパーで解決できた 両方で必要かも知れない場合には結局 values を渡すので render hook の意義が薄れる

// :) component hook pair
// :( render hook
// x? context render （↓と同じく x）
// x  downstream portal （Provider の場所が悪かった？しかし上 2 つを導入していないとstateが採ってこれないので単独ではNG）

// TODO
// マウントしたときに実行したい処理はどうする？
