import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Barrier = ({ children }: { children: ReactNode }) => {
  const baseRef = useRef<HTMLDivElement>(null);

  const [shadowRoot, setShadowRoot] = useState<HTMLElement>();

  // failure 手動の Shadow DOM よりもひどい書き味
  useLayoutEffect(() => {
    const fragment = new DOMParser().parseFromString(
      `<div style="display: contents"><template shadowroot="open"><slot></slot></template></div>`,
      "text/html",
      { includeShadowRoots: true }
    );

    const div = fragment.querySelector("div")!;

    setShadowRoot(div.shadowRoot as unknown as HTMLElement);
    baseRef.current?.appendChild(div);
  }, []);

  return (
    <div ref={baseRef} style={{ display: "contents" }}>
      {shadowRoot ? createPortal(<span>{children}</span>, shadowRoot) : null}
    </div>
  );
};
