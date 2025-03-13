[< back](../../README.md)

# Authentication and Authorization
This package exports utility functions, hooks and React components for authentcation and authorization.

## Authentication with JWT token
JWT token which received from the authencation API service will be store in both the browser `local storage` and the `cookies storage`.
#### Why do we use both `local storage` and `cookies storage`?
- `cookies storage` can synchronize up with the server side. In most of case, we should access the auth data from this storage.
- `local storage` can trigger event when the change occurs, so it is only used for state synchronizing between multple browser tabs.
- The auth data at these storages are the same.

## The `AuthStates` context
``` typescript
import { AuthStates } from "@shared/auth";
```
First, wrap all the components or view which can reach the the auth data by the `AuthStates` component.
``` typescript
import { AuthStates } from "@shared/auth";

<AuthStates>
  ....
</AuthStates>
```

## How to get a state
#### in Client Component
Use the hook `useGetAuthState` for retrive the state.
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