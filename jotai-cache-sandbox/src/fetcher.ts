import { sleep } from "./util";

export const fetchTime = async () => {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Tokyo`);
  await sleep(1000);
  return (await res.json()) as { datetime: string };
};

export const updateLocation = async () => {
  await sleep(1000);
};
