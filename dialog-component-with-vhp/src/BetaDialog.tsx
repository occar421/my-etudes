import { DialogBase, useDialogBase } from "./DialogBase";

type Args = {
  onAccept?: () => void;
};

type Messages = {
  baseMessages: ReturnType<typeof useDialogBase>["messages"];
} & Args;

type Exports = { show: () => void; close: () => void };

export const useBetaDialog = (
  args: Args = {}
): { messages: Messages; exports: Exports } => {
  const dialogBase = useDialogBase();

  return {
    messages: {
      baseMessages: dialogBase.messages,
      onAccept: args.onAccept,
    },
    exports: { show: dialogBase.exports.show, close: dialogBase.exports.close },
  };
};

type Props = Messages;

export const BetaDialog = ({ baseMessages, onAccept }: Props) => (
  <DialogBase {...baseMessages}>
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
