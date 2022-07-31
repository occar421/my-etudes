import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Suspense, useRef } from "react";

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
    () =>
      fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo").then<{
        datetime: string;
      }>((r) => r.json()),
    { map: (obj) => new Date(obj.datetime) }
  );

  return <p>{data.toLocaleTimeString()}</p>;
};

const useQuery = <TD, TR>(
  key: string,
  fetcher: () => Promise<TD>,
  { map }: { map?: (data: TD) => TR }
) => {
  // @FIXME https://github.com/facebookexperimental/Recoil/issues/439
  const setFetcher = useSetRecoilState(fetcherState(key));
  const prevKey = useRef<string>();
  if (prevKey.current !== key) {
    setFetcher(fetcher);
  }
  prevKey.current = key;

  const payload = useRecoilValue(cacheState(key)) as TD;

  return { data: (map?.(payload) ?? payload) as TR };
};

const fetcherState = atomFamily<() => Promise<unknown>, string>({
  key: "fetcherState",
});

const cacheState = selectorFamily({
  key: "cacheState",
  get:
    (key: string) =>
    ({ get }) => {
      const fetchers = get(fetcherState(key));
      return fetchers();
    },
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
