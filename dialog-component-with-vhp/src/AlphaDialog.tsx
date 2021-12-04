import { DialogBase, useDialogBase } from "./DialogBase";

type Args = {
  onAccept?: () => void;
  onCancel?: () => void;
};

type Messages = {
  baseMessages: ReturnType<typeof useDialogBase>["messages"];
} & Pick<Args, "onAccept" | "onCancel">;

type Exports = { show: () => void; close: () => void };

export const useAlphaDialog = (
  args: Args = {}
): { messages: Messages; exports: Exports } => {
  const dialogBase = useDialogBase();

  return {
    messages: {
      baseMessages: dialogBase.messages,
      onAccept: args.onAccept,
      onCancel: args.onCancel,
    },
    exports: { show: dialogBase.exports.show, close: dialogBase.exports.close },
  };
};

type Props = Messages;

export const AlphaDialog = ({
  baseMessages,
  onAccept,
  onCancel: onCancel_,
}: Props) => {
  const onCancel = () => {
    baseMessages.onClose?.();
    onCancel_?.();
  };

  return (
    <DialogBase {...baseMessages} onClose={onCancel}>
      <div className="bg-white border border-gray-700 rounded w-[400px] p-3">
        <header>
          <h2 className="font-bold text-xl">Alpha Dialog</h2>
        </header>
        <p className="mt-1">
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-1 px-4 rounded"
            onClick={onAccept}
          >
            OK
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-gray-200 text-gray-700 transition font-semibold py-1 px-4 border border-gray-500 rounded ml-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </DialogBase>
  );
};
