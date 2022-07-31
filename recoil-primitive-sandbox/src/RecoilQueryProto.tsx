import { Suspense } from "react";
import { useQuery, useQueryClient } from "./recoil-query";
import { sleep } from "./sleep";

export const RecoilQueryProto = () => (
  <div>
    <h2>Recoil Query Proto</h2>
    <Suspense fallback={<p>Loading...</p>}>
      <p>
        <Suspense fallback="Loading...">
          <Inner1 />
        </Suspense>{" "}
        <Suspense fallback="Loading...">
          <Inner2 />
        </Suspense>{" "}
        <Inner3 />
      </p>
    </Suspense>
  </div>
);

const Inner1 = () => {
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

  return <span>{data.toLocaleDateString()}</span>;
};

const Inner2 = () => {
  const { data } = useQuery(
    "time/asia/tokyo",
    async () => {
      await sleep(500);
      const res = await fetch(
        "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
      );
      const data = await res.json();
      return data as { datetime: string };
    },
    { map: (obj) => new Date(obj.datetime) }
  );

  return <span>{data.toLocaleTimeString()}</span>;
};

const Inner3 = () => {
  const qc = useQueryClient();

  return (
    <button
      onClick={() => {
        qc.invalidateQueries(["time/asia/tokyo"]);
      }}
    >
      Invalidate time
    </button>
  );
};
