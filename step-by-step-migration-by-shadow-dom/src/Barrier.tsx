import { type ReactNode } from "react";
import { css } from "@emotion/react";

type Props = {
  children: ReactNode;
};

function Barrier({ children }: Props) {
  return (
    <span
      css={css`
        display: contents;
      `}
    >
      {children}
    </span>
  );
}

export default Barrier;
