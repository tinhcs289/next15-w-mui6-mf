"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import isEqual from "./isEqual";

type PlainObject = { [x: string]: any };

export type UseSetStateReturns<StateValues extends PlainObject = PlainObject> =
  (
    value: Partial<StateValues> | ((states?: StateValues) => StateValues)
  ) => void;

/**
 * A lightweight and flexible state management solution using React Context API.
 *
 * This helper lets you create a context store with convenient hooks to:
 * - Provide and consume global state in your React app.
 * - Get state slices efficiently with selectors.
 * - Update state partially or with functional updates.
 * - Initialize or reset state values on mount or when dependencies change.
 * - Store and manage callback functions as part of the state.
 *
 * @template StateValues The shape of your state object.
 *
 * @example
  // Step 1: Create context provider and hooks with your state shape
  const {
    StatesProvider,
    useGetState,
    useSetState,
    useInitState,
    useCallbackState,
  } = createStatesContext<{ backgroundColor?: string }>();
 
  // Step 2: Wrap your app or components with the Provider
  <StatesProvider>
    <YourComponents />
  </StatesProvider>
 
  // Step 3: Read a state value from the store using a selector function
  const backgroundColor = useGetState(store => store.backgroundColor);
 
  // Step 4: Update state using the setter returned by useSetState
  const setState = useSetState();
  setState({ backgroundColor: "blue" });
  // Or update based on previous state
  setState(prev => ({ ...prev, backgroundColor: "yellow" }));
 
  // The following features are independent and can be used as needed:
 
  // Initialize or reset a state value, optionally updating when the value changes
  useInitState("backgroundColor", "red");
  useInitState("backgroundColor", dynamicColor, { when: "whenever-value-changes" });
 
  // Store callback functions in the state store:
  // Option 1: Initialize callback using useInitState
  const someCallback = useCallback((param) => { ... }, []);
  useInitState("someCallback", someCallback, { when: "whenever-value-changes" });
 
  // Option 2: Create and store callback directly using useCallbackState
  const someCallback = useCallbackState("someCallback", (param) => { / ... / }, []);
 
  // Retrieve and call a stored callback function
  const storedCallback = useGetState(store => store.someCallback);
  storedCallback?.(args);
 */
export function createStatesContext<
  StateValues extends PlainObject = PlainObject,
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

  function useSafeStore(): UseContextStatesDataReturns {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Store not found");
    return store;
  }

  function useGetState<SelectorOutput>(
    selector: (store: StateValues) => SelectorOutput
  ): SelectorOutput {
    const store = useSafeStore();

    const previousRef = useRef<SelectorOutput>(undefined);
    const getSnapshot = () => {
      const next = selector(store.get());
      if (isEqual(previousRef.current, next)) {
        return previousRef.current as SelectorOutput;
      }
      previousRef.current = next;

      return next;
    };

    const getServerSnapshot = () => selector(initialState as StateValues);

    const state = useSyncExternalStore(
      store.subscribe,
      getSnapshot,
      getServerSnapshot
    );
    return state;
  }

  function useSetState(): UseSetStateReturns<StateValues> {
    const store = useSafeStore();
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

    useLayoutEffect(() => {
      if (init && !forceUpdate) return;
      if (isEqual(value, state)) return;
      setInit(true);
      setState({ [field]: value } as any);
    }, [value, state]);

    return init;
  }

  function useCallbackState<F extends Function>(
    callbackName: keyof StateValues,
    ...useCallbackParams: Parameters<typeof useCallback<F>>
  ) {
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

export type CreateStatesContext<StateValues extends PlainObject = PlainObject> =
  ReturnType<typeof createStatesContext<StateValues>>;

export type UseGetState<StateValues extends PlainObject = PlainObject> =
  CreateStatesContext<StateValues>["useGetState"];

export type UseSetState<StateValues extends PlainObject = PlainObject> =
  CreateStatesContext<StateValues>["useSetState"];

export type UseInitState<StateValues extends PlainObject = PlainObject> =
  CreateStatesContext<StateValues>["useInitState"];

export type UseCallbackState<StateValues extends PlainObject = PlainObject> =
  CreateStatesContext<StateValues>["useCallbackState"];
