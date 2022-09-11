import { atomWithQuery } from "jotai/query";
import { atom, WritableAtom } from "jotai";
import { useMemo } from "react";

let count = 0;

export const atomWithCache = <TQueryFnData>(
  fetcher: () => Promise<TQueryFnData>
) =>
  atomWithQuery(() => ({
    queryKey: [count++], // fake
    queryFn: fetcher,
  }));

export type StandardStatus = "idle" | "loading";

export const atomWithMutation = (mutate: () => Promise<void>) => {
  const statusAtom = atom<StandardStatus>("idle");

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

export const useAtomGeneratorWithStatus = <U>(
  targetAtom: WritableAtom<StandardStatus, U>,
  params: {
    onMutate?: (args: U) => Promise<void>;
    onSettled?: () => Promise<void>;
  } = {}
): WritableAtom<StandardStatus, U> =>
  useMemo(() => {
    const localStatusAtom = atom<StandardStatus>("idle");

    return atom(
      (get) => {
        const localStatus = get(localStatusAtom);
        const targetStatus = get(targetAtom);
        return localStatus === "loading" || targetStatus === "loading"
          ? "loading"
          : "idle";
      },
      async (get, set, args: U) => {
        try {
          set(localStatusAtom, "loading");
          await params.onMutate?.(args);

          await set(targetAtom, args);
        } finally {
          await params.onSettled?.();
          set(localStatusAtom, "idle");
        }
      }
    );
  }, []);
