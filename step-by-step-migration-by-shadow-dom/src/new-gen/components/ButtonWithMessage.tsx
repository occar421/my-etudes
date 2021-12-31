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
    <Tooltip message={message || ""}>
      <button
        type="button"
        css={css`
          font-size: calc(10px + 2vmin);
        `}
        onClick={onClick}
      >
        {children}
      </button>
    </Tooltip>
  );
}

export default Button;
