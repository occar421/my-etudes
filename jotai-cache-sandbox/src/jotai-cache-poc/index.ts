import { atomWithQuery } from "jotai/query";
import { atom } from "jotai";

let count = 0;

export const atomWithCache = <TQueryFnData>(
  fetcher: () => Promise<TQueryFnData>
) =>
  atomWithQuery(() => ({
    queryKey: [count++], // fake
    queryFn: fetcher,
  }));

export const atomWithMutation = (mutate: () => Promise<void>) => {
  const statusAtom = atom<"idle" | "loading">("idle");

  return atom(
    (get) => get(statusAtom),
    async (get, set) => {
      try {
        set(statusAtom, "loading");
        await mutate();
      } finally {
        set(statusAtom, "idle");
      }
    }
  );
};
