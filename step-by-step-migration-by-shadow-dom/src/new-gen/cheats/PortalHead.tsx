import Barrier from "./Barrier";
import React, { type ReactNode, type ReactPortal } from "react";
import { createPortal as reactCreatePortal } from "react-dom";
import { CacheProvider, css } from "@emotion/react";
import createCache from "@emotion/cache";

function PortalHead() {
  return (
    <div
      id="portal-head"
      css={css`
        display: contents;
      `}
    >
      <Barrier />
    </div>
  );
}

export default PortalHead;

function getElement(): HTMLElement {
  return document.querySelector("#portal-head > *")!
    .shadowRoot! as unknown as HTMLElement;
}

export function createPortal(children: ReactNode): ReactPortal {
  const element = getElement();

  let emotionCache = cacheRef?.deref();
  if (!emotionCache) {
    emotionCache = createCache({ key: "portal-head", container: element });
    cacheRef = new WeakRef(emotionCache);
  }

  return reactCreatePortal(
    <CacheProvider value={emotionCache}>{children}</CacheProvider>,
    element
  );
}

let cacheRef: WeakRef<ReturnType<typeof createCache>> | undefined;
