import { DialogBase, useDialogBase } from "./DialogBase";
import { useState } from "react";

type Args = {
  onAccept?: () => void;
  onCancel?: () => void;
};

type Messages = {
  baseMessages: ReturnType<typeof useDialogBase>["messages"];
  cookieChecked: boolean;
  onChangeCookieChecked?: () => void;
} & Args;

type Exports = { show: () => void; close: () => void };

export const useAlphaDialog = (
  args: Args = {}
): { messages: Messages; exports: Exports } => {
  const dialogBase = useDialogBase();

  const [checked, setChecked] = useState(false);

  return {
    messages: {
      baseMessages: dialogBase.messages,
      onAccept: args.onAccept,
      onCancel: () => {
        dialogBase.messages.onClose?.();
        args.onCancel?.();
      },
      cookieChecked: checked,
      onChangeCookieChecked: () => {
        setChecked((x) => !x);
      },
    },
    exports: {
      show: () => {
        setChecked(false);

        dialogBase.exports.show();
      },
      close: dialogBase.exports.close,
    },
  };
};

type Props = Messages;

export const AlphaDialog = ({
  baseMessages,
  cookieChecked,
  onChangeCookieChecked,
  onAccept,
  onCancel,
}: Props) => (
  <DialogBase {...baseMessages} onClose={onCancel}>
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
