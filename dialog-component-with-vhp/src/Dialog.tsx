import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Messages = { open: boolean; onClose: () => void };

type Exports = { show: () => void; close: () => void };

export const useDialog = (): {
  messages: Messages;
  exports: Exports;
} => {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    messages: { open, onClose: close },
    exports: { show, close },
  };
};

type Props = Messages & { children: ReactNode };

export const Dialog = ({ open, onClose, children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    document.addEventListener(
      "click",
      (e) => {
        if (
          e.target instanceof HTMLDivElement &&
          contentRef.current &&
          !contentRef.current.contains(e.target)
        ) {
          onClose();
        }
      },
      {
        signal: controller.signal,
      }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return createPortal(
    open ? (
      <div className="fixed inset-0 h-screen w-screen z-40 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
        <div ref={contentRef}>{children}</div>
      </div>
    ) : null,
    document.getElementById("root")!
  );
};
