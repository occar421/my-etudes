import { Dialog, useDialog } from "./Dialog";

function App() {
  const { messages, exports } = useDialog();

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="h-96 w-96 bg-white flex justify-center items-center drop-shadow">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            exports.show();
          }}
        >
          Open
        </button>
        <Dialog {...messages}>
          <p>aaa</p>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
