import {
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
} from "recoil";
import { Suspense, useState, useTransition } from "react";
import { sleep } from "./sleep";

export const TimeIs = () => {
  const [contentHidden, setContentHidden] = useState(true);
  const [anotherContentHidden, setAnotherContentHidden] = useState(true);
  const [pending, startTransition] = useTransition();
  const refreshTime = useRecoilRefresher_UNSTABLE(tokyoDateTimeState);
  const buttonDisabled = contentHidden || pending;
  const anotherButtonDisabled = anotherContentHidden || pending;

  return (
    <div>
      <h2>Refresh api result</h2>
      <div>
        <button
          onClick={() => setContentHidden(false)}
          disabled={!contentHidden}
        >
          Show
        </button>
        <button onClick={() => setAnotherContentHidden((x) => !x)}>
          {!anotherContentHidden ? "Show" : "Hide"} another
        </button>
        <button onClick={refreshTime} disabled={buttonDisabled}>
          Update
        </button>
        <button
          onClick={() => startTransition(refreshTime)}
          disabled={buttonDisabled}
        >
          Update silently
        </button>
        <Suspense fallback={<p>Loading...</p>}>
          {!contentHidden ? <Content /> : null}
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
          {!anotherContentHidden ? <Content /> : null}
        </Suspense>
      </div>
    </div>
  );
};

const Content = () => {
  const date = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(tokyoDateState);
  const time = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(tokyoTimeState);

  return (
    <p>
      {date} {time}
    </p>
  );
};

const fetchTime = async () => {
  const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo");
  const data = await res.json();
  await sleep(500);
  return new Date(data.datetime);
};

const tokyoDateTimeState = selector({
  key: "tokyoDataTimeState",
  get: () => fetchTime(),
});

const tokyoDateState = selector({
  key: "tokyoDateState",
  get: ({ get }) => {
    const dateTime = get(tokyoDateTimeState);
    return dateTime.toLocaleDateString();
  },
});

const tokyoTimeState = selector({
  key: "tokyoTimeState",
  get: ({ get }) => {
    const dateTime = get(tokyoDateTimeState);
    return dateTime.toLocaleTimeString();
  },
});
