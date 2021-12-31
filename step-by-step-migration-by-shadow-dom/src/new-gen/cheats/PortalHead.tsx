import Barrier from "./Barrier";
import React, { type ReactNode, type ReactPortal } from "react";
import { createPortal as reactCreatePortal } from "react-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const ID = "portal-head";

function PortalHead() {
  return <Barrier id={ID} />;
}

export default PortalHead;

function getElement(): HTMLElement {
  return document.getElementById(ID)!.shadowRoot! as unknown as HTMLElement;
}

export function createPagePortal(children: ReactNode): ReactPortal {
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
