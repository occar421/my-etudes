import { selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";

export const useQuery = <TD, TR>(
  key: string,
  fetcher: () => Promise<TD>,
  { map }: { map?: (data: TD) => TR }
) => {
  fetchersMap.set(key, fetcher);

  const payload = useRecoilValue(cacheState(key)) as TD;
  return { data: (map?.(payload) ?? payload) as TR };
};

const cacheState = selectorFamily({
  key: "cacheState",
  get: (key: string) => () => fetchersMap.get(key)!(),
});

export const useQueryClient = () => {
  const refreshMany = useRecoilCallback(({ refresh }) => (keys: string[]) => {
    for (const key of keys) {
      refresh(cacheState(key));
    }
  });
  return {
    invalidateQueries: refreshMany,
  };
};

const fetchersMap = new Map<string, () => Promise<unknown>>();
