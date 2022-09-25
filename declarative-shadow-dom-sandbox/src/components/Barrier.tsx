import { ReactNode, useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

class BarrierElement extends HTMLElement {
  constructor() {
    super();

    const internals = this.attachInternals();
    console.log(internals.shadowRoot);

    this.attachShadow();

    const mountPoint = document.createElement("span");
    this.shadowRoot?.appendChild(mountPoint);

    const root = createRoot(mountPoint);
    root.render(
      <template shadowroot="open">
        <p>aaaa</p>
        <slot></slot>
        <p>bbbb</p>
      </template>
    );
  }
}

customElements.define("x-barrier", BarrierElement);

export const Barrier = ({ children }: { children: ReactNode }) => {
  // const baseRef = useRef<HTMLTemplateElement>(null);
  //
  // useLayoutEffect(() => {
  //   const template = baseRef.current;
  //   if (!template) {
  //     return;
  //   }
  //
  //   template.shadowRoot?.appendChild(template.content.cloneNode(true));
  // }, []);

  return <x-barrier>{children}</x-barrier>;
};
