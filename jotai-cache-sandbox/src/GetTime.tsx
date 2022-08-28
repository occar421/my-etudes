import { atomWithQuery } from "jotai/query";
import { useAtomValue } from "jotai";

const fetchTime = async () => {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Tokyo`);
  return (await res.json()) as { datetime: string };
};

const timeAtom = atomWithQuery(() => ({
  queryKey: ["time"],
  queryFn: fetchTime,
}));

export const GetTime = () => {
  const res = useAtomValue(timeAtom);

  return (
    <div>
      <p>
        Tokyo: <time>{res.datetime}</time>
      </p>
    </div>
  );
};
