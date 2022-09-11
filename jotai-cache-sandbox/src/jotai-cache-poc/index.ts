import { atomWithQuery } from "jotai/query";
import { Atom, unstable_createStore } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";

export { useSetAtom as useRefresher } from "jotai";
export { useMutation } from "@tanstack/react-query";

let count = 0;

export const atomWithCache = <TQueryFnData>(
  fetcher: () => Promise<TQueryFnData>
) =>
  atomWithQuery(() => ({
    queryKey: [count++], // fake
    queryFn: fetcher,
  }));

export const atomWithOptimisticState = <T>(
  baseAtom: Atom<T>,
  store: ReturnType<typeof unstable_createStore>
) => {
  const optimisticValueAtom = atomWithDefault((get) => get(baseAtom));

  store.sub(baseAtom, () => {
    const newValue = store.get(baseAtom);
    store.set(
      optimisticValueAtom,
      newValue === undefined ? RESET : (newValue as unknown as T)
    );
  });

  return optimisticValueAtom;
};
