/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

// #region isEqual
const isIterable = (obj: object): obj is Iterable<unknown> =>
  Symbol.iterator in obj;

const hasIterableEntries = (
  value: Iterable<unknown>
): value is Iterable<unknown> & {
  entries(): Iterable<[unknown, unknown]>;
} =>
  // HACK: avoid checking entries type
  "entries" in value;

const compareEntries = (
  valueA: { entries(): Iterable<[unknown, unknown]> },
  valueB: { entries(): Iterable<[unknown, unknown]> }
) => {
  const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
  const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value] of mapA) {
    if (!Object.is(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};

// Ordered iterables
const compareIterables = (
  valueA: Iterable<unknown>,
  valueB: Iterable<unknown>
) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!Object.is(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};

function isEqual<T>(valueA: T, valueB: T): boolean {
  if (Object.is(valueA, valueB)) {
    return true;
  }
  if (
    typeof valueA !== "object" ||
    valueA === null ||
    typeof valueB !== "object" ||
    valueB === null
  ) {
    return false;
  }
  if (!isIterable(valueA) || !isIterable(valueB)) {
    return compareEntries(
      { entries: () => Object.entries(valueA) },
      { entries: () => Object.entries(valueB) }
    );
  }
  if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
    return compareEntries(valueA, valueB);
  }
  return compareIterables(valueA, valueB);
}
// #endregion

type BaseStates = { [x: string]: any };

export type UseSetStateReturns<StateValues extends BaseStates = BaseStates> = (
  value: Partial<StateValues> | ((states?: StateValues) => StateValues)
) => void;

/**
 * Super tiny helper for state management base on React Context API
 * @example
    // Step 1: create context provider and hooks in generic type of states
    const { Provider, useGetState, useSetState, useInitState, useCallbackState } = createFastContext<{ backgroundColor?: string }>();

    // Step 2: Wrap Components inside the `<Provider />` component
    <Provider>
      <YourComponents />
    </Provider>

    // How to get a state from store
    const backgroundColor = useGetState((store) => store.backgroundColor);

    // How to update a state in store
    const setState = useSetState();
    ...
    setState({ backgroundColor: 'blue' });
    // or
    setState(states => ({ ...states, backgroundColor: 'yellow' }));

    // How to init default value for a state
    useInitState('backgroundColor', 'red');

    // How to synchronize state with a dynamic state or value
    useInitState('backgroundColor', color, { when: 'whenever-value-changes' });

    // How to add a callback function to store
    // option 1: use `useInitState` hook
    const { ... } = createStatesContext<{ ..., someCallbackFunction: (params: ...) => void }>();
    ....
    const someCallbackFunction = useCallback((params: ...) => { ... }, [...]);

    useInitState('someCallbackFunction', someCallbackFunction, { when: 'whenever-value-changes' });


    // option 1: use `useCallbackState` hook
    const { ..., useCallbackState } = createStatesContext<{ ..., someCallbackFunction: (params: ...) => void } }>();
    ....
    const someCallbackFunction = useCallbackState('someCallbackFunction',(params: ...) => { ... }, [...]);
    
    // How to use a function which has been added to store.
    const someCallbackFunction = useGetState((store) => store.someCallbackFunction);
    ...
    someCallbackFunction?.(...);
 */
export function createStatesContext<
  StateValues extends BaseStates = BaseStates,
>(initialState?: StateValues) {
  function useContextStatesData(): {
    get: () => StateValues;
    set: UseSetStateReturns<StateValues>;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState as StateValues);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set: UseSetStateReturns<StateValues> = useCallback((value) => {
      if (typeof value === "function") {
        store.current = { ...store.current, ...value(store.current) };
        subscribers.current.forEach((callback) => callback());
        return;
      }
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return { get, set, subscribe };
  }

  type UseContextStatesDataReturns = ReturnType<typeof useContextStatesData>;

  const StoreContext = createContext<UseContextStatesDataReturns | null>(null);

  function StatesProvider({ children }: { children: ReactNode }) {
    return (
      <StoreContext.Provider value={useContextStatesData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useGetState<SelectorOutput>(
    selector: (store: StateValues) => SelectorOutput
  ): SelectorOutput {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState as StateValues)
    );

    return state;
  }

  function useSetState(): UseSetStateReturns<StateValues> {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }
    return store.set;
  }

  function useInitState(
    field: keyof StateValues,
    value?:
      | number
      | string
      | boolean
      | Array<any>
      | { [x: string]: any }
      | ReactNode,
    options: {
      when: "once-on-mount" | "whenever-value-changes";
    } = {
      when: "once-on-mount",
    }
  ) {
    const forceUpdate = options?.when === "whenever-value-changes";

    const setState = useSetState();
    const state = useGetState((s) => s?.[field]);
    const [init, setInit] = useState(false);

    useEffect(() => {
      if (init && !forceUpdate) return;
      if (
        (typeof value === "undefined" || value === null || value === "") &&
        !forceUpdate
      ) {
        return;
      }

      if (value instanceof Array || typeof value === "object") {
        if (isEqual(value, state)) return;
        setInit(true);
        setState({ [field]: value } as any);
        return;
      }

      if (typeof value === "function") {
        setInit(true);
        setState({ [field]: value } as any);
        return;
      }

      if (value === state) return;

      setInit(true);
      setState({ [field]: value } as any);
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return init;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  function useCallbackState<F extends Function>(
    callbackName: keyof StateValues,
    ...useCallbackParams: Parameters<typeof useCallback<F>>
  ) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback<F>(...useCallbackParams);
    useInitState(callbackName, callback, { when: "whenever-value-changes" });
    return callback;
  }

  return {
    StatesProvider,
    useGetState,
    useSetState,
    useInitState,
    useCallbackState,
  };
}

export type CreateStatesContext<StateValues extends BaseStates = BaseStates> =
  ReturnType<typeof createStatesContext<StateValues>>;

export type UseGetState<StateValues extends BaseStates = BaseStates> =
  CreateStatesContext<StateValues>["useGetState"];

export type UseSetState<StateValues extends BaseStates = BaseStates> =
  CreateStatesContext<StateValues>["useSetState"];

export type UseInitState<StateValues extends BaseStates = BaseStates> =
  CreateStatesContext<StateValues>["useInitState"];

export type UseCallbackState<StateValues extends BaseStates = BaseStates> =
  CreateStatesContext<StateValues>["useCallbackState"];
