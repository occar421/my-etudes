import {
  AlphaDialog,
  useAlphaDialogProps,
  useAlphaDialogReducer,
} from "./AlphaDialog";
import {
  BetaDialog,
  useBetaDialogProps,
  useBetaDialogReducer,
} from "./BetaDialog";
import { useCallback } from "react";
import {
  DialogBase,
  useDialogBaseProps,
  useDialogBaseReducer,
} from "./DialogBase";

function App() {
  const alphaBus = useAlphaDialogReducer({ open: false, cookieChecked: false });
  const onAccept = useCallback(function () {
    console.info("Alpha accepted.");
    alphaBus.dispatch({ type: "Close" });
  }, []);
  const alphaProps = useAlphaDialogProps(alphaBus, {
    onAccept,
    onCancel: useCallback(function () {
      console.info("Alpha canceled.");
      alphaBus.dispatch({ type: "Close" });
    }, []),
  });

  const betaBus = useBetaDialogReducer({ open: false });
  const betaProps = useBetaDialogProps(betaBus, {
    onAccept: () => {
      console.info("Beta accepted.");
      betaBus.dispatch({ type: "Close" });
    },
  });

  const gammaBus = useDialogBaseReducer({ open: false });
  const gammaProps = useDialogBaseProps(gammaBus, {
    onClose: () => {
      gammaBus.dispatch({ type: "Close" });
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="h-96 w-96 bg-white flex justify-center items-center drop-shadow">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            alphaBus.dispatch({ type: "Clear" });
            alphaBus.dispatch({ type: "Show" });
          }}
        >
          Open Alpha
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 transition text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            betaBus.dispatch({ type: "Show" });
          }}
        >
          Open Beta
        </button>
        <AlphaDialog {...alphaProps} />
        <BetaDialog {...betaProps} />
        <DialogBase {...gammaProps}>γ</DialogBase>
      </div>
    </div>
  );
}

export default App;
