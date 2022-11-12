import {
  atomsWithQuery as _atomsWithQuery,
  atomsWithMutation as _atomsWithMutation,
} from "jotai-tanstack-query";

export const atomsWithCache = <TQueryFnData>(
  fetcher: () => Promise<TQueryFnData>
) =>
  _atomsWithQuery(() => ({
    queryFn: fetcher,
  }));

export const atomsWithMutation = (mutate: () => Promise<void>) =>
  _atomsWithMutation(() => ({
    mutationFn: mutate,
  }));
