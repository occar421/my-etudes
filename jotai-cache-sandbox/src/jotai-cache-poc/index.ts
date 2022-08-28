import { atomWithQuery } from "jotai/query";

let count = 0;

export const atomWithCache = <TQueryFnData>(
  fetcher: () => Promise<TQueryFnData>
) => {
  return atomWithQuery(() => ({
    queryKey: [count++], // fake
    queryFn: fetcher,
  }));
};
