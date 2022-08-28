import { atomWithQuery } from "jotai/query";
import { Atom, atom } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { globalJotaiStore } from "../util";
export { useSetAtom as useRefresher } from "jotai";
export { useMutation } from "@tanstack/react-query";

let count = 0;

export const atomWithCache = <TQueryFnData>(
  fetcher: () => Promise<TQueryFnData>
) => {
  const core = atomWithQuery(() => ({
    queryKey: [count++], // fake
    queryFn: fetcher,
  }));

  return atom<TQueryFnData, unknown>(
    (get) => get(core),
    (_, set) => {
      set(core, { type: "refetch" });
    }
  );
};

export const atomWithOptimisticState = <T>(baseAtom: Atom<T>) => {
  const optimisticValueAtom = atomWithDefault((get) => get(baseAtom));

  globalJotaiStore.sub(baseAtom, () => {
    const newValue = globalJotaiStore.get(baseAtom);
    if (!newValue) {
      return;
    }
    globalJotaiStore.set(optimisticValueAtom, newValue as unknown as T);
  });

  return optimisticValueAtom;
};
