import {
  DialogBase,
  useDialogBaseProps,
  useDialogBaseReducer,
} from "./DialogBase";
import { Dispatch, useCallback, useReducer, useRef, useState } from "react";
import { Bound } from "./Type";

type InternalState = {
  getBaseBus: () => ReturnType<typeof useDialogBaseReducer>;
  resetState: () => InitialState;
  cookieChecked: boolean;
};

type PublicAction = { type: "Show" } | { type: "Close" } | { type: "Clear" };
type PrivateAction = { type: "ToggleCookieChecked" };
type Action = PublicAction | PrivateAction;

const reducer = (prevState: InternalState, action: Action): InternalState => {
  const { dispatch: baseDispatch } = prevState.getBaseBus();

  switch (action.type) {
    case "Show":
      baseDispatch({ type: "Show" });
      return prevState;
    case "Close":
      baseDispatch({ type: "Close" });
      return prevState;
    case "Clear":
      return { ...prevState, ...prevState.resetState() };
    case "ToggleCookieChecked":
      return { ...prevState, cookieChecked: !prevState.cookieChecked };
  }
};

type InitialState = { open: boolean; cookieChecked: boolean };

const convert = (initialState: InitialState) => initialState;

export const useAlphaDialogReducer = (
  initialState: InitialState
): { state: InternalState; dispatch: Dispatch<PublicAction> } => {
  const baseBusRef = useRef<ReturnType<typeof useDialogBaseReducer>>();
  baseBusRef.current = useDialogBaseReducer({ open: initialState.open });

  const [state, dispatch] = useReducer(reducer, {
    ...convert(initialState),
    getBaseBus: () => baseBusRef.current!,
    resetState: () => initialState,
  });

  return { state, dispatch };
};

type Args = {
  onAccept?: () => void;
  onCancel?: () => void;
};

type Props = {
  baseProps: ReturnType<typeof useDialogBaseProps>;
  cookieChecked: boolean;
  onChangeCookieChecked?: () => void;
} & Args;

type Exports = {
  show: () => void;
  close: () => void;
  clear: () => void;
};

export const useAlphaDialogProps = (
  { state, dispatch }: ReturnType<typeof useAlphaDialogReducer>,
  args: Bound<Args, Exports>
): Props => {
  const baseProps = useDialogBaseProps(state.getBaseBus(), {
    onClose: args.onCancel,
  });

  return {
    baseProps,
    onAccept: args.onAccept,
    onCancel: args.onCancel,
    cookieChecked: state.cookieChecked,
    onChangeCookieChecked: useCallback(() => {
      dispatch({ type: "ToggleCookieChecked" as any }); // @FIXME private にできない
    }, []),
  };
};

export const AlphaDialog = ({
  baseProps,
  cookieChecked,
  onChangeCookieChecked,
  onAccept,
  onCancel,
}: Props) => (
  <DialogBase {...baseProps}>
    <div className="bg-white border border-gray-700 rounded w-[400px] p-3">
      <header>
        <h2 className="font-bold text-xl">Alpha Dialog</h2>
      </header>
      <p className="mt-1">
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
        tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <p className="mt-2">
        <label>
          <input
            type="checkbox"
            className="mr-1"
            checked={cookieChecked}
            onChange={onChangeCookieChecked}
          />
          Accepts all cookies.
        </label>
      </p>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className=" bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-1 px-4 rounded
                          disabled:opacity-75 disabled:hover:bg-blue-500 disabled:cursor-not-allowed"
          onClick={onAccept}
          disabled={!cookieChecked}
        >
          OK
        </button>
        <button
          type="button"
          className=" bg-transparent hover:bg-gray-200 text-gray-700 transition font-semibold border border-gray-500 rounded
                          py-1 px-4 ml-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </DialogBase>
);
