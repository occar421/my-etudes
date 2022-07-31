import { Suspense } from "react";
import { useQuery, useQueryClient } from "./recoil-query";
import { sleep } from "./sleep";

export const RecoilQueryProto = () => {
  const qc = useQueryClient();

  return (
    <div>
      <h2>Recoil Query Proto</h2>
      <button
        onClick={() => {
          qc.invalidateQueries(["time/asia/tokyo"]);
        }}
      >
        Invalidate
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        <Inner />
      </Suspense>
    </div>
  );
};

const Inner = () => {
  const { data } = useQuery(
    "time/asia/tokyo",
    async () => {
      const res = await fetch(
        "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
      );
      const data = await res.json();
      await sleep(500);
      return data as { datetime: string };
    },
    { map: (obj) => new Date(obj.datetime) }
  );

  return <p>{data.toLocaleTimeString()}</p>;
};
