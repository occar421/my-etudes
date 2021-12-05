import { DialogBase, useDialogBase } from "./DialogBase";
import { useState } from "react";
import { Bound } from "./Type";

type Args = {
  onAccept?: () => void;
  onCancel?: () => void;
};

type Props = {
  baseProps: ReturnType<typeof useDialogBase>["props"];
  cookieChecked: boolean;
  onChangeCookieChecked?: () => void;
} & Args;

type Exports = {
  show: () => void;
  close: () => void;
  clear: () => void;
};

export const useAlphaDialog = (
  args: Bound<Args, Exports>
): { props: Props; exports: Exports } => {
  const dialogBase = useDialogBase({ onClose: args.onCancel });

  const [checked, setChecked] = useState(false);

  const exports = {
    show: dialogBase.exports.show,
    close: dialogBase.exports.close,
    clear: () => {
      setChecked(false);
    },
  };

  return {
    props: {
      baseProps: dialogBase.props,
      onAccept: args.onAccept?.bind(exports),
      onCancel: args.onCancel?.bind(exports),
      cookieChecked: checked,
      onChangeCookieChecked: () => {
        setChecked((x) => !x);
      },
    },
    exports,
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
