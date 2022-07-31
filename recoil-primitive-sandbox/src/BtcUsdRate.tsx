import { atom, selector, useRecoilValue } from "recoil";
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

  return (
    <div>
      <h2>Default atom value</h2>
      <button onClick={() => setHidden(false)}>Show</button>
      <p>
        <Suspense fallback="Loading...">{!hidden ? <Inner /> : null}</Suspense>
      </p>
    </div>
  );
};

const Inner = () => {
  const rate = useRecoilValue(usdRateState);

  return <>1 BTC = {rate} USD</>;
};
