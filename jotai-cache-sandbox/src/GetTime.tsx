import { useAtom } from "jotai";
import { atomWithCache, useMutation } from "./jotai-cache-poc";
import { fetchTime, updateLocation } from "./fetcher";

const timeAtom = atomWithCache(fetchTime);

export const GetTime = () => {
  const [time, setTime] = useAtom(timeAtom);
  const { mutate: mutateLocation, isLoading } = useMutation(updateLocation, {
    onSettled: () => {
      setTime({ type: "refetch" });
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
