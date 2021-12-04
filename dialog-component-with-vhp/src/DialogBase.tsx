import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Args = {
  onClose?: () => void;
};

type Props = {
  open?: boolean;
} & Args;

type Exports = {
  show: () => void;
  close: () => void;
};

export const useDialogBase = (
  args: Args
): {
  props: Props;
  exports: Exports;
} => {
  const [open, setOpen] = useState(false);

  return {
    props: { open, onClose: args.onClose },
    exports: {
      show: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    },
  };
};

export const DialogBase = ({
  open,
  onClose,
  children,
}: Props & { children: ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

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

    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          onClose?.();
        }
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, [open]);

  return createPortal(
    open ? (
      <div
        className=" fixed inset-0 h-screen w-screen z-40
                    flex items-center justify-center
                    bg-gray-500 bg-opacity-75 transition-opacity"
      >
        <div ref={contentRef}>{children}</div>
      </div>
    ) : null,
    document.getElementById("root")!
  );
};
