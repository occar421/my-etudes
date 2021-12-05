type Defined<T> = T extends undefined ? never : T;

export type Bound<T, This> = {
  [P in keyof T]: Defined<T[P]> extends (...args: infer P) => infer R
    ? (this: This, ...args: P) => R
    : T[P];
};

export {};
