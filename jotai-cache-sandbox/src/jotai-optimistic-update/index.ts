import { Atom, unstable_createStore } from "jotai";
import { atomWithDefault } from "jotai/utils";

export const atomWithOptimisticUpdate = <T>(
  baseAtom: Atom<T>,
  store: ReturnType<typeof unstable_createStore>
) => {
  const optimisticValueAtom = atomWithDefault((get) => get(baseAtom));

  store.sub(baseAtom, () => {
    const newValue = store.get(baseAtom);

    if (newValue !== undefined) {
      store.set(optimisticValueAtom, newValue as unknown as T);
    }
  });

  return optimisticValueAtom;
};
