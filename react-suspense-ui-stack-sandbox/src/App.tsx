import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useState,
  useTransition,
} from "react";

const DataGetterContext = createContext<(key: string) => string | undefined>(
  () => undefined
);

const DataSetterContext = createContext(
  (_: string, __: string | undefined) => {}
);

const DataClearContext = createContext(() => {});

const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [dataMap, setDataMap] = useState(new Map<string, string>());

  return (
    <DataGetterContext.Provider value={(key) => dataMap.get(key)}>
      <DataSetterContext.Provider
        value={(key, value) => {
          if (value === undefined) {
            dataMap.delete(key);
          } else {
            dataMap.set(key, value);
          }
        }}
      >
        <DataClearContext.Provider value={() => setDataMap(new Map())}>
          {children}
        </DataClearContext.Provider>
      </DataSetterContext.Provider>
    </DataGetterContext.Provider>
  );
};

export const App = () => {
  const [delay, setDelay] = useState(1000);
  const [generation, setGeneration] = useState(0);

  const cacheKey = "data-" + generation;

  const [nextLoading, startNextLoadingTransition] = useTransition();

  return (
    <CacheProvider>
      <div className="flex bg-gray-200 h-screen p-12 justify-center items-center">
        <div className="bg-white p-2 rounded-xl w-96">
          <nav className="flex gap-2">
            <label>
              <span className="after:content-[':']">Delay</span>
              <input
                className="ml-1 border"
                type="number"
                value={delay}
                min={0}
                max={5000}
                step={500}
                onChange={(e) => setDelay(e.target.valueAsNumber)}
              />
            </label>
            <button
              type="button"
              className="bg-gray-300 px-1"
              onClick={() => {
                startNextLoadingTransition(() => {
                  setGeneration((gen) => ++gen);
                });
              }}
            >
              Next load
            </button>
            <DataClearContext.Consumer>
              {(clear) => (
                <button
                  type="button"
                  className="bg-gray-300 px-1"
                  onClick={() => clear()}
                >
                  Reset all
                </button>
              )}
            </DataClearContext.Consumer>
          </nav>
          <main className="relative h-96 border p-2 mt-2">
            <Suspense
              fallback={
                <Wall>
                  <div className="flex flex-col justify-center items-center">
                    <div className="mb-1">Initial loading...</div>
                    <Spinner />
                  </div>
                </Wall>
              }
            >
              <LoadData cacheKey={cacheKey} delay={delay} />
            </Suspense>
            {nextLoading ? (
              <Wall>
                <div className="flex flex-col justify-center items-center">
                  <div className="mb-1">Continual loading...</div>
                  <Spinner />
                </div>
              </Wall>
            ) : null}
          </main>
        </div>
      </div>
    </CacheProvider>
  );
};

const Wall = ({ children }: { children: ReactNode }) => (
  <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-white bg-opacity-60">
    {children}
  </div>
);

const Spinner = () => (
  <div className="animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-transparent" />
);

const LoadData = ({
  cacheKey,
  delay = 1000,
}: {
  cacheKey: string;
  delay?: number;
}) => {
  const data = useData(cacheKey, { delay });

  return (
    <ul className="border border-gray-500">
      {[...new Array(5)].map(() => (
        <li className="text-lg border-b border-gray-500 last:border-none p-4">
          Data is {data}
        </li>
      ))}
    </ul>
  );
};

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const useData = (cacheKey: string, options: { delay: number }) => {
  const getter = useContext(DataGetterContext);
  const setter = useContext(DataSetterContext);
  const data = getter(cacheKey);

  if (data === undefined) {
    throw Promise.resolve().then(async () => {
      await sleep(options.delay);

      setter(cacheKey, "Hello");
    });
  }

  return data;
};
