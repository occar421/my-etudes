import { unstable_createStore } from "jotai";

export const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const globalStore = unstable_createStore();
