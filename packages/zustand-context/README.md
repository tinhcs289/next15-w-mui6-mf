[< back](../../README.md)

# Zustand with React Context

This is a usage of Zustand with React context

#### Why context?
By normal use, we will create a instance of zustand store then keep it in the global as `singleton`. But if we want to duplicate this instance, how can we do it. Only put the instance into a Context.
#### When will we need this?
For example, if we use zustand to manage states of a list of data, and in the view, there are multiple vairant of the list, so duplicating the store is needed.

## Create context provider and hook functions
First, define the type of the data in the store.
``` typescript
type StoreData = {
  foo: number;
  increaseFoo: () => void;
  ...
};
```
Pass the type to `createZustandStoreContext` function which returns `StoreProvider` and hook `useStoreContext`.
``` typescript
const { StoreProvider, useStoreContext } = createZustandStoreContext<StoreData>(
  (set) => ({
    foo: 1,
    increaseFoo: () => set((s) => ({ foo: s.foo + 1 })),
    ...
  })
);
```
Finally, wrap all the components which can reach the the states by the `StoreProvider` component.
``` typescript
<StoreProvider>
  ....
</StoreProvider>
```

## How to use the store
Use the hook `useStoreContext` for retrive the state.
``` typescript
const increaseFoo = useStoreContext((s) => s.increaseFoo);
```