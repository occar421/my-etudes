import { useAtomValue, useSetAtom } from "jotai";
import { atomWithCache, atomWithMutation } from "./jotai-cache-poc";
import { fetchTime, updateLocation } from "./fetcher";
import { Suspense, useState, useTransition } from "react";
import { globalStore } from "./util";
import { atomWithOptimisticUpdate } from "./jotai-optimistic-update";

const timeAtom = atomWithCache(fetchTime);
const locationMutationAtom = atomWithMutation(updateLocation);

const timeOptimisticAtom = atomWithOptimisticUpdate(timeAtom, globalStore);

export const GetTime = () => {
  const refreshTime = useSetAtom(timeAtom);
  const setOptimisticTime = useSetAtom(timeOptimisticAtom);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [transitioning, startTransition] = useTransition();
  const { mutate: mutateLocationCore, status: mutateLocationStatus } =
    useAtomValue(locationMutationAtom);

  const mutateLocation = async () => {
    setOptimisticTime({ datetime: `"Optimistic value"` });

    await mutateLocationCore(undefined, {
      onSettled: async () => {
        if (transitionEnabled) {
          startTransition(() => {
            refreshTime({ type: "refetch", force: true });
          });
        } else {
          refreshTime({ type: "refetch", force: true });
        }
      },
    });
  };

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
        disabled={mutateLocationStatus === "loading"}
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
