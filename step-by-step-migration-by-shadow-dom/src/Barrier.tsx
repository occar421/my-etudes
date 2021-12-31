import React, {
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CacheProvider, css, Global } from "@emotion/react";
import { createPortal } from "react-dom";
import createCache from "@emotion/cache";

type Props = {
  children: ReactNode;
};

function Barrier({ children }: Props) {
  const baseRef = useRef<HTMLElement>(null);

  const [shadowRoot, setShadowRoot] = useState<ShadowRoot>();

  useLayoutEffect(() => {
    setShadowRoot(
      (prev) => prev ?? baseRef.current?.attachShadow({ mode: "open" })
    );
  }, []);

  return (
    <span
      ref={baseRef}
      css={css`
        display: contents;
      `}
    >
      {shadowRoot
        ? createPortal(
            <Inner shadowRoot={shadowRoot}>{children}</Inner>,
            shadowRoot as unknown as Element
          )
        : null}
    </span>
  );
}

const cache = new WeakMap<ShadowRoot, ReturnType<typeof createCache>>();

function Inner({
  shadowRoot,
  children,
}: {
  shadowRoot: ShadowRoot;
  children: ReactNode;
}) {
  let emotionCache = cache.get(shadowRoot);
  if (!emotionCache) {
    emotionCache = createCache({
      key: "barrier",
      container: shadowRoot as unknown as HTMLElement,
      prepend: true,
    });
    cache.set(shadowRoot, emotionCache);
  }

  return (
    <CacheProvider value={emotionCache}>
      <Global styles={theNewCssReset} />
      {children}
    </CacheProvider>
  );
}

export default Barrier;

const theNewCssReset = css`
  /*** The new CSS Reset - version 1.4.4 (last updated 22.12.2021) ***/

  /*
      Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
      - The "symbol *" part is to solve Firefox SVG sprite bug
   */
  *:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
    all: unset;
    display: revert;
  }

  /* Preferred box-sizing value */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove list styles (bullets/numbers) */
  ol,
  ul,
  menu {
    list-style: none;
  }

  /* For images to not be able to exceed their container */
  img {
    max-width: 100%;
  }

  /* removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }

  /* revert the 'white-space' property for textarea elements on Safari */
  textarea {
    white-space: revert;
  }

  /* fix the feature of 'hidden' attribute.
     display:revert; revert to element instead of attribute */
  :where([hidden]) {
    display: none;
  }

  /* revert for bug in Chromium browsers
     - fix for the content editable attribute will work properly. */
  :where([contenteditable]) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
  }

  /* apply back the draggable feature - exist only in Chromium and Safari */
  :where([draggable="true"]) {
    -webkit-user-drag: element;
  }
`;
