import React, {
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { css } from "@emotion/react";
import { createPortal } from "react-dom";
import StyleWrapper from "./StyleWrapper";

type Props = {
  id?: string;
  children?: ReactNode;
};

function ShadowWrapper({ id, children }: Props) {
  const baseRef = useRef<HTMLElement>(null);

  const [shadowRoot, setShadowRoot] = useState<ShadowRoot>();

  useLayoutEffect(() => {
    setShadowRoot(
      (prev) => prev ?? baseRef.current?.attachShadow({ mode: "open" })
    );
  }, []);

  return (
    <span
      id={id}
      ref={baseRef}
      css={css`
        display: contents;
      `}
    >
      {shadowRoot
        ? createPortal(
            <StyleWrapper shadowRoot={shadowRoot}>{children}</StyleWrapper>,
            shadowRoot as unknown as Element
          )
        : null}
    </span>
  );
}

export default ShadowWrapper;
