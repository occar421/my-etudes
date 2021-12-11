import { Dispatch, type ReactNode, useEffect, useReducer, useRef } from "react";
import { createPortal } from "react-dom";

type InternalState = { open: boolean };

type PublicAction = { type: "Show" } | { type: "Close" };

type Action = PublicAction;

const reducer = (prevState: InternalState, action: Action): InternalState => {
  switch (action.type) {
    case "Show":
      return { ...prevState, open: true };
    case "Close":
      return { ...prevState, open: false };
  }
};

type InitialState = { open: boolean };

const convert = (initialState: InitialState) => initialState;

export const useDialogBaseReducer = (
  initialState: InitialState
): { state: InternalState; dispatch: Dispatch<PublicAction> } => {
  const [state, dispatch] = useReducer(reducer, convert(initialState));

  return { state, dispatch };
};

type Args = {
  onClose?: () => void;
};

type Props = {
  open?: boolean;
} & Args;

export const useDialogBaseProps = (
  { state }: ReturnType<typeof useDialogBaseReducer>,
  args: Args
): Props => {
  return {
    open: state.open,
    onClose: args.onClose,
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
