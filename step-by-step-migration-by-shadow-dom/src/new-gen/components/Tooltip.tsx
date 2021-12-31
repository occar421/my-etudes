import { css } from "@emotion/react";
import { createPortal } from "../cheats/PortalHead";

type Props = { message: string };

function Tooltip({ message }: Props) {
  return createPortal(
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
      `}
    >
      <span
        css={css`
          background: white;
          border-radius: 4px;
        `}
      >
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
