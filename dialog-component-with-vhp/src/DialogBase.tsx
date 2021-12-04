import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Args = {
  onClose?: () => void;
};

type Messages = { open: boolean; onClose?: () => void };

type Exports = { show: () => void; close: () => void };

export const useDialogBase = (
  args: Args = {}
): {
  messages: Messages;
  exports: Exports;
} => {
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  return {
    messages: { open, onClose: args.onClose },
    exports: { show, close },
  };
};

type Props = Messages & { children: ReactNode };

export const DialogBase = ({ open, onClose, children }: Props) => {
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
          onClose?.();
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
