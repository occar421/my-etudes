import { useAtomValue, useSetAtom } from "jotai";
import {
  atomWithCache,
  atomWithOptimisticState,
  useMutation,
  useRefresher,
} from "./jotai-cache-poc";
import { fetchTime, updateLocation } from "./fetcher";
import { Suspense, useState, useTransition } from "react";

const timeAtom = atomWithCache(fetchTime);

const timeOptimisticAtom = atomWithOptimisticState(timeAtom);

export const GetTime = () => {
  const refreshTime = useRefresher(timeAtom);
  const setOptimisticTime = useSetAtom(timeOptimisticAtom);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [transitioning, startTransition] = useTransition();

  const { mutate: mutateLocation, isLoading } = useMutation(updateLocation, {
    onMutate: () => {
      setOptimisticTime({ datetime: `"Optimistic value"` });
    },
    onSettled: () => {
      if (transitionEnabled) {
        startTransition(() => {
          refreshTime();
        });
      } else {
        refreshTime();
      }
    },
  });

  return (
    <div style={{ color: transitioning ? "gray" : "inherit" }}>
      <Suspense fallback={<p>Loading 1</p>}>
        <GetTime1 />
      </Suspense>
      <Suspense fallback={<p>Loading 2</p>}>
        <GetTime2 />
      </Suspense>
      <button type="button" onClick={() => setTransitionEnabled((x) => !x)}>
        {`${transitionEnabled ? "Disable" : "Enable"} Transition (Current: ${
          transitionEnabled ? "Enabled" : "Disable"
        })`}
      </button>
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

const GetTime1 = () => {
  const time = useAtomValue(timeAtom);

  return (
    <p>
      Tokyo: <time>{time.datetime}</time>
    </p>
  );
};

const GetTime2 = () => {
  const optimisticTime = useAtomValue(timeOptimisticAtom);

  return (
    <p>
      Optimistic Tokyo: <time>{optimisticTime.datetime}</time>
    </p>
  );
};
