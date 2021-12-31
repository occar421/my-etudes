import { css } from "@emotion/react";
import { createPagePortal } from "../cheats/PortalHead";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = { message: string; children: ReactNode };

function Tooltip({ message, children }: Props) {
  const baseRef = useRef<HTMLSpanElement>(null);

  const [rect, setRect] = useState<DOMRectReadOnly>();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((e) => {
      setRect(e[0].target.getBoundingClientRect());
    });
    observer.observe(baseRef.current!);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span
        ref={baseRef}
        css={css`
          display: inline-flex;
        `}
        // work
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        // not work
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </span>
      {rect
        ? createPagePortal(
            <div
              css={css`
                position: fixed;
                justify-content: center;
                pointer-events: none;
              `}
              style={{
                top: rect.bottom,
                left: rect.left,
                right: document.body.clientWidth - rect.right,
                display: hovered ? "flex" : "none",
              }}
              role="presentation"
            >
              <div
                css={css`
                  display: inline-flex;
                  justify-content: center;
                  min-width: 200px;
                `}
              >
                <div
                  css={css`
                    display: inline-flex;
                    background: white;
                    border-radius: 4px;
                    pointer-events: initial;
                    padding: 4px;
                  `}
                >
                  {message}
                </div>
              </div>
            </div>
          )
        : null}
    </>
  );
}

export default Tooltip;
