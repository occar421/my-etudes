import { selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import { Suspense, useRef } from "react";
import { fetchersMap } from "./fetchers-map";

export const RecoilQueryProto = () => {
  const qc = useQueryClient();

  return (
    <div>
      <h2>Recoil Query Proto</h2>
      <button
        onClick={() => {
          qc.invalidateQueries(["a"]);
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
    "a",
    async () => {
      const res = await fetch(
        "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
      );
      const data = await res.json();
      return data as { datetime: string };
    },
    { map: (obj) => new Date(obj.datetime) }
  );

  return <p>{data.toLocaleTimeString()}</p>;
};

const useQuery = <TD, TR>(
  key: string,
  fetcher: () => Promise<TD>,
  { map }: { map?: (data: TD) => TR }
) => {
  const prevKey = useRef<string>();
  if (prevKey.current !== key) {
    fetchersMap.set(key, fetcher);
  }
  prevKey.current = key;

  const payload = useRecoilValue(cacheState(key)) as TD;

  return { data: (map?.(payload) ?? payload) as TR };
};

const cacheState = selectorFamily({
  key: "cacheState",
  get: (key: string) => () => fetchersMap.get(key)!(),
});

const useQueryClient = () => {
  const refreshMany = useRecoilCallback(({ refresh }) => (keys: string[]) => {
    for (const key of keys) {
      refresh(cacheState(key));
    }
  });
  return {
    invalidateQueries: refreshMany,
  };
};
