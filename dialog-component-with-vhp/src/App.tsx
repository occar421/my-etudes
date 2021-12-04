import { DialogBase, useDialogBase } from "./DialogBase";
import { AlphaDialog, useAlphaDialog } from "./AlphaDialog";

function App() {
  const alphaDialog = useAlphaDialog();
  const betaDialog = useDialogBase({
    onClose: () => betaDialog.exports.close(),
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="h-96 w-96 bg-white flex justify-center items-center drop-shadow">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            alphaDialog.exports.show();
          }}
        >
          Open Alpha
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 transition text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            betaDialog.exports.show();
          }}
        >
          Open Beta
        </button>
        <AlphaDialog
          {...alphaDialog.messages}
          onAccept={() => {
            console.info("Alpha accepted.");
            alphaDialog.exports.close();
          }}
          onCancel={() => {
            console.info("Alpha canceled.");
            alphaDialog.exports.close();
          }}
        />
        <DialogBase {...betaDialog.messages}>
          <p>bbb</p>
        </DialogBase>
      </div>
    </div>
  );
}

export default App;
