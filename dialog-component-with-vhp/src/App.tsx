import { Dialog, useDialog } from "./Dialog";

function App() {
  const alphaDialog = useDialog();
  const betaDialog = useDialog();

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
        <Dialog {...alphaDialog.messages}>
          <p>aaa</p>
        </Dialog>
        <Dialog {...betaDialog.messages}>
          <p>bbb</p>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
