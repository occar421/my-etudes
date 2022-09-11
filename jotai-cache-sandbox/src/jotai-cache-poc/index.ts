import { atomWithQuery } from "jotai/query";
import { atom, useAtomValue, WritableAtom } from "jotai";
import { useState } from "react";
import { useAtomCallback } from "jotai/utils";

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

export const useAtomWithStatus = <T, U>(
  atom: WritableAtom<T, U>,
  params: {
    onMutate?: (args: U) => Promise<void>;
    onSettled?: () => Promise<void>;
  } = {}
) => {
  const [status, setStatus] = useState<StandardStatus>("idle");
  const callback = useAtomCallback(async (get, set, args: U) => {
    try {
      setStatus("loading");
      await params.onMutate?.(args);

      await set(atom, args);
    } finally {
      await params.onSettled?.();
      setStatus("idle");
    }
  });
  return [useAtomValue(atom), callback, status] as const;
};
