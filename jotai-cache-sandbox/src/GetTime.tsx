import { useAtomValue } from "jotai";
import { atomWithCache, useMutation, useRefresher } from "./jotai-cache-poc";
import { fetchTime, updateLocation } from "./fetcher";

const timeAtom = atomWithCache(fetchTime);

export const GetTime = () => {
  const time = useAtomValue(timeAtom);
  const refreshTime = useRefresher(timeAtom);
  const { mutate: mutateLocation, isLoading } = useMutation(updateLocation, {
    onSettled: () => {
      refreshTime();
    },
  });

  return (
    <div>
      <p>
        Tokyo: <time>{time.datetime}</time>
      </p>
      <button
        type="button"
        onClick={() => mutateLocation()}
        disabled={isLoading}
      >
        Invalidate
      </button>
    </div>
  );
};
