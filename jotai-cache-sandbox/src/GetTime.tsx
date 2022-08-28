import { atomWithQuery } from "jotai/query";
import { useAtom } from "jotai";

const fetchTime = async () => {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Tokyo`);
  return (await res.json()) as { datetime: string };
};

const timeAtom = atomWithQuery(() => ({
  queryKey: ["time"],
  queryFn: fetchTime,
}));

export const GetTime = () => {
  const [time, setTime] = useAtom(timeAtom);

  return (
    <div>
      <p>
        Tokyo: <time>{time.datetime}</time>
      </p>
      <button type="button" onClick={() => setTime({ type: "refetch" })}>
        Invalidate
      </button>
    </div>
  );
};
