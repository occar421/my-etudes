import {
  DialogBase,
  reducerForDialogBase,
  useDialogBaseProps,
} from "./DialogBase";
import { Dispatch } from "react";

type State = {
  baseState: Parameters<typeof reducerForDialogBase>[0];
};

type Action = { type: "Show" } | { type: "Close" };

export const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "Show":
      return {
        ...prevState,
        baseState: reducerForDialogBase(prevState.baseState, { type: "Show" }),
      };
    case "Close":
      return {
        ...prevState,
        baseState: reducerForDialogBase(prevState.baseState, { type: "Close" }),
      };
  }
};

type Args = {
  onAccept?: () => void;
};

type Props = {
  baseProps: ReturnType<typeof useDialogBaseProps>;
} & Args;

type Exports = {
  show: () => void;
  close: () => void;
};

export const useBetaDialog = ([{ baseState }]: [
  State,
  Dispatch<Action>
]): Props => {
  const dialogBase = useDialogBaseProps([baseState]);

  return {
    props: {
      baseProps: dialogBase.props,
      onAccept: args.onAccept,
    },
    exports: { show: dialogBase.exports.show, close: dialogBase.exports.close },
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
