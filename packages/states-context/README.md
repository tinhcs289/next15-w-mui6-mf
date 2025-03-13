[< back](../../README.md)

# Super tiny state management tool

This is a state management tool 100% by React Context API with no dependencies.

## The concept
This is simply a React Context that contains a pub/sub store assigned to a ref variable.
#### Why ref?
Because `ref` is not react `state`, it could not make the Provider and its children re-render when the data has changes.
#### Why pub/sub store?
Because with the pub/sub pattern can make the components can access, update and detect the changes by connecting to the a store. Components can trigger a re-render when a change occurs.
<br />
#### How does the pub/sub store work?
By combining ref variable and pub/sub store then passing them to the context, we can make the component tree re-render exactly where the state changes without affecting other components.

The store holds all the states and provides pub/sub methods:
- `get` for state access.
- `set` for state mutation.
- `subcribe` for listening the changes from store.
- `unsubcribe` for disconnecting from of store.

But we won't need to care about them. There are 4 hook functions that wrap these original functions from the store:
- `useGetState`
- `useSetState`
- `useInitState`
- `useCallbackState`

Let's see how they work.

## Create context provider and hook functions
First, define the type of the states object.
``` typescript
type StatesData = {
  // ...
};
```
Pass the type to `createStatesContext` function which returns `Provider` and hook functions.
``` typescript
const {
  Provider,
  useGetState,
  useSetState,
  useInitState,
  useCallbackState
} = createStatesContext<StatesData>();
```
Finally, wrap all the components which can reach the the states by the `Provider` component. 
``` typescript
<Provider>
  ....
</Provider>
```

## How to get a state
Use the hook `useGetState` for retrive the state.
``` typescript
const state = useGetState((states) => states.someState);
```

## How to update state
Create `setState` dispatcher function which returned by the hook `useSetState`.
``` typescript
const setState = useSetState();
```
Use the function `setState` for update the value of the states.
``` typescript
setState({ someState: 'blue' });
```
Or
``` typescript
setState(states => ({ ...states, someState: 'red' }));
```

## How to intialize default values for state
####  option 1:
You can pass default values to the states at the time that the context is created.
``` typescript
import  { createStatesContext } from "@shared/states-context";
const { ... } = createStatesContext<StatesData>({
  // put default values here
});
```
####  option 2:
You can also intialize the value of a state at the first time the component is rendered by using the hook `useInitState`.
``` typescript
useInitState('someState', 'blue');
```
## How to synchronize the state from the external of the context.
``` typescript
useInitState(
  'someState', someExternalValue,
  { when: 'whenever-value-changes' }
);
```
This is useful if you want to synchronize the value of the state with another value from an external source like the state of the parent component or value from some other store.

## How to add a callback function into the context for general use.
Define you callback
``` typescript
const callback = useCallback((...) => { ... }, [...]);
```
Pass the callback to the hook `useInitState`, the callback will be added to the context as a state.
``` typescript
useInitState(
  'openSideBar', callback,
  { when: 'whenever-value-changes' }
);
```
In where you want to use the callback, use the hook `useGetState` to retrive it.
``` typescript
const openSideBar = useGetState(states => s?.openSideBar);
```
This is useful if you want to add a callback function into the context for general use from everywhere inside the Provider.
## Intergrate with NextJS
It only needs to put the directive `"use client";` on top of the file. 
## States in generic type
In case the type of object states is generic.
``` typescript
type StatesData<T> = {
  // ...
};
```
And you want to use hook functions as generic too, there is a trick.
<br />
The tool also exports some generic types for customzing. You should use these types to define a generic function that returns the hooks. This can transform the hooks to generic.
``` typescript
import {
  createStatesContext,
  UseCallbackState,
  UseGetState,
  UseInitState,
  UseSetState,
  UseSetStateReturns,
} from "@shared/states-context";

const {
  Provider,
  useGetState,
  useSetState,
  useInitState,
  useCallbackState
} = createStatesContext<StatesData>();

const createStatesHooks = <T>() => ({
  useGetState: useGetState as UseGetState<StatesData<T>>;
  useSetState: useSetState as UseSetState<StatesData<T>>;
  useInitState: useInitState as UseInitState<StatesData<T>>;
  useCallbackState: useCallbackState as UseCallbackState<StatesData<T>>;
});
```
## What can be improved in this tool?
This tool is very simple, and I only want to keep it simple. There are nothing to improve. Just enjoy it!