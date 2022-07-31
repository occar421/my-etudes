import {
  atom,
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { Suspense, useState } from "react";
import { sleep } from "./sleep";

const fetchUsdRate = async () => {
  const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const data = await res.json();
  await sleep(500);
  return data.bpi.USD.rate_float as number;
};

const usdRateState = atom({
  key: "usdRateState",
  default: selector({
    key: "usdRateState/Default",
    get: () => fetchUsdRate(), // だと最初の読み取り時に取得する。
  }),
  // default: fetchUsdRate(), だとファイルの読み込みと同時に取得する。
  // default: fetchUsdRate, だとそのまま Promise が返る。
});

export const BtcUsdRate = () => {
  const [hidden, setHidden] = useState(true);
  const reset = useResetRecoilState(usdRateState); // キャッシュした "usdRateState/Default" の値でリセット。API からの再取得はしない。
  const setRate = useSetRecoilState(usdRateState);

  return (
    <div>
      <h2>Default atom value</h2>
      <button onClick={() => setHidden(false)} disabled={!hidden}>
        Show
      </button>
      <button onClick={() => reset()} disabled={hidden}>
        Update
      </button>
      <button onClick={() => setRate((x) => x + 1)} disabled={hidden}>
        Increment
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        {!hidden ? <Inner /> : null}
      </Suspense>
    </div>
  );
};

const Inner = () => {
  const rate = useRecoilValue(usdRateState);

  return <p>1 BTC = {rate} USD</p>;
};
