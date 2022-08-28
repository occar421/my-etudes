import { useAtom, useAtomValue } from "jotai";
import {
  atomWithCache,
  atomWithOptimistic,
  useMutation,
  useRefresher,
} from "./jotai-cache-poc";
import { fetchTime, updateLocation } from "./fetcher";

const timeAtom = atomWithCache(fetchTime);

const timeOptimisticAtom = atomWithOptimistic(timeAtom);

export const GetTime = () => {
  const time = useAtomValue(timeAtom);
  const refreshTime = useRefresher(timeAtom);
  const [optimisticTime, setOptimisticTime] = useAtom(timeOptimisticAtom);

  const { mutate: mutateLocation, isLoading } = useMutation(updateLocation, {
    onMutate: () => {
      setOptimisticTime({ datetime: `"Optimistic value"` });
    },
    onSettled: () => {
      refreshTime();
    },
  });

  return (
    <div>
      <p>
        Tokyo: <time>{time.datetime}</time>
      </p>
      <p>
        Optimistic Tokyo: <time>{optimisticTime.datetime}</time>
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
