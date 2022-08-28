const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchTime = async () => {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Tokyo`);
  await sleep(1000);
  return (await res.json()) as { datetime: string };
};

export const updateLocation = async () => {
  await sleep(1000);
};
