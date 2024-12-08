"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

type BaseStates = { [x: string]: any };

/**
 * Zustand with context, this function let you duplicate a store by multiple instances
 * and make them become independent according to each provider.
 * @example
    // step 1: define your shape of states 
    type SomeStoreStates = {
      foo: number;
      increaseFoo: () => void;
      ...
    };

    // step 2: create store provider and a hook to access the store.
    const { StoreProvider, useStoreContext } =
      createZustandStoreContext<SomeStoreStates>((set) => ({
        foo: 1,
        increaseFoo: () => set((s) => ({ foo: s.foo + 1 })),
        ...
      }));

    // step 3: wrap your group of components by the `StoreProvider` component.
    const MyApp = () => {
      // store are not able to access from here.
      return (
        // store are only able to access from components inside `StoreProvider`.
        <StoreProvider>
          <Foo />
          <ButtonChangeFoo />
          ...
        </StoreProvider>
      )
    }

    // step 4: use `useStoreContext` hook to access the store.
    const Foo = () => {
      const foo = useStoreContext(s => s.foo);
      return (
        <div>
          {foo}
        </div>
      )
    }

    const ButtonChangeFoo = () => {
      const increaseFoo = useStoreContext(s => s.increaseFoo);
      return (
        <button onClick={() => { increaseFoo() }} />
      )
    }
 *
 */
export function createZustandStoreContext<States extends BaseStates = BaseStates>(
  ...createStoreParams: Parameters<typeof createStore<States, []>>
) {
  const Context = createContext(null);
  function StoreProvider({ children }: { children?: ReactNode }) {
    const storeRef = useRef<ReturnType<typeof createStore<States, []>>>(null);
    if (!storeRef.current) {
      storeRef.current = createStore<States, []>(...createStoreParams);
    }
    return (
      <Context.Provider value={storeRef.current as any}>
        {children}
      </Context.Provider>
    );
  }

  function useStoreContext<Output>(selector: (state: States) => Output) {
    const store = useContext(Context);
    if (!store) {
      throw new Error("Missing StoreProvider");
    }
    return useStore(store, selector);
  }

  return {
    StoreProvider,
    useStoreContext,
  };
}

export type CreateZustandStoreContext<StateValues extends BaseStates = BaseStates> =
  ReturnType<typeof createZustandStoreContext<StateValues>>;

export type UseStoreContext<StateValues extends BaseStates = BaseStates> =
CreateZustandStoreContext<StateValues>["useStoreContext"];