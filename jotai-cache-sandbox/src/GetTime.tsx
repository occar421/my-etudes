import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  atomWithCache,
  atomWithMutation,
  useAtomGeneratorWithStatus,
} from "./jotai-cache-poc";
import { fetchTime, updateLocation } from "./fetcher";
import { Suspense, useState, useTransition } from "react";
import { globalStore } from "./util";
import { atomWithOptimisticUpdate } from "./jotai-optimistic-update";

const timeAtom = atomWithCache(fetchTime);
const locationMutationCoreAtom = atomWithMutation(updateLocation);

const timeOptimisticAtom = atomWithOptimisticUpdate(timeAtom, globalStore);

export const GetTime = () => {
  const refreshTime = useSetAtom(timeAtom);
  const setOptimisticTime = useSetAtom(timeOptimisticAtom);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [transitioning, startTransition] = useTransition();

  const locationMutationAtom = useAtomGeneratorWithStatus(
    locationMutationCoreAtom,
    {
      onMutate: async () => {
        setOptimisticTime({ datetime: `"Optimistic value"` });
      },
      onSettled: async () => {
        if (transitionEnabled) {
          startTransition(() => {
            refreshTime({ type: "refetch" });
          });
        } else {
          await refreshTime({ type: "refetch" });
        }
      },
    }
  );
  const [status, mutateLocation] = useAtom(locationMutationAtom);

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
        disabled={status === "loading"}
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
