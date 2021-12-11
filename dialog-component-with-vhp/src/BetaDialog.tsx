import {
  DialogBase,
  useDialogBaseProps,
  useDialogBaseReducer,
} from "./DialogBase";
import { useReducer, useRef } from "react";

type InternalState = {
  getBaseBus: () => ReturnType<typeof useDialogBaseReducer>;
};

type Action = { type: "Show" } | { type: "Close" };

const reducer = (prevState: InternalState, action: Action): InternalState => {
  const { dispatch: baseDispatch } = prevState.getBaseBus();

  switch (action.type) {
    case "Show":
      baseDispatch({ type: "Show" });
      return prevState;
    case "Close":
      baseDispatch({ type: "Close" });
      return prevState;
  }
};

type InitialState = { open: boolean };

const convert = (initialState: InitialState) => initialState;

export const useBetaDialogReducer = (initialState: InitialState) => {
  const baseBusRef = useRef<ReturnType<typeof useDialogBaseReducer>>();
  baseBusRef.current = useDialogBaseReducer({ open: initialState.open });

  const [state, dispatch] = useReducer(reducer, {
    ...convert(initialState),
    getBaseBus: () => baseBusRef.current!,
  });

  return { state, dispatch };
};

type Args = {
  onAccept?: () => void;
};

type Props = {
  baseProps: ReturnType<typeof useDialogBaseProps>;
} & Args;

export const useBetaDialogProps = (
  { state }: ReturnType<typeof useBetaDialogReducer>,
  args: Args
): Props => {
  const baseProps = useDialogBaseProps(state.getBaseBus(), {});

  return {
    baseProps,
    onAccept: args.onAccept,
  };
};

export const BetaDialog = ({ baseProps, onAccept }: Props) => (
  <DialogBase {...baseProps}>
    <div className="bg-white border border-gray-700 rounded w-[400px] p-3">
      <header>
        <h2 className="font-bold text-xl">Beta Dialog</h2>
      </header>
      <p className="mt-1">The persistent dialog.</p>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-1 px-4 rounded"
          onClick={onAccept}
        >
          OK
        </button>
      </div>
    </div>
  </DialogBase>
);
