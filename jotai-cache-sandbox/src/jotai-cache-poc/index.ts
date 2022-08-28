import { atomWithQuery } from "jotai/query";
import { atom } from "jotai";
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
