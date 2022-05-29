import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useState,
} from "react";

const DataGetterContext = createContext<() => string | undefined>(
  () => undefined
);

const DataSetterContext = createContext((_: string | undefined) => {});

const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string>();

  return (
    <DataGetterContext.Provider value={() => data}>
      <DataSetterContext.Provider value={(value) => setData(value)}>
        {children}
      </DataSetterContext.Provider>
    </DataGetterContext.Provider>
  );
};

export const App = () => {
  const [delay, setDelay] = useState(1000);

  return (
    <CacheProvider>
      <div className="p-6">
        <div className="flex gap-1">
          <label>
            <span>Delay:</span>
            <input
              className="ml-2 border"
              type="number"
              value={delay}
              min={0}
              max={5000}
              step={500}
              onChange={(e) => setDelay(e.target.valueAsNumber)}
            />
          </label>
          <DataSetterContext.Consumer>
            {(setter) => (
              <button
                type="button"
                className="bg-gray-300"
                onClick={() => setter(undefined)}
              >
                Clear cache
              </button>
            )}
          </DataSetterContext.Consumer>
        </div>
        <div>
          <Suspense fallback={<div>Initial loading</div>}>
            <LoadData delay={delay} />
          </Suspense>
        </div>
      </div>
    </CacheProvider>
  );
};

const LoadData = ({ delay = 1000 }: { delay?: number } = {}) => {
  const data = useData("data", { delay });

  return <div>Data is {data}</div>;
};

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const useData = (cacheKey: string, options: { delay: number }) => {
  const getter = useContext(DataGetterContext);
  const setter = useContext(DataSetterContext);
  const data = getter();

  if (data === undefined) {
    throw Promise.resolve().then(async () => {
      await sleep(options.delay);

      setter("Hello");
    });
  }

  return data;
};
