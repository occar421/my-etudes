import { type ReactNode } from "react";
import { css } from "@emotion/react";
import Tooltip from "./Tooltip";

type Props = {
  message?: string;
  children?: ReactNode;
  onClick?: () => void;
};

function Button({ message, children, onClick }: Props) {
  return (
    <button
      type="button"
      css={css`
        font-size: calc(10px + 2vmin);
      `}
      onClick={onClick}
    >
      {children}
      {message ? <Tooltip message={message} /> : null}
    </button>
  );
}

export default Button;
