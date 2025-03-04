"use client";

import { createStatesContext } from "@shared/states-context";
import type { AuthLayoutStates } from "../types";

const {
  StatesProvider: AuthLayoutStatesProvider,
  useGetState: useGetAuthLayoutState,
  useCallbackState: useDefineAuthLayoutMethod,
  useInitState: useInitAuthLayoutState,
  useSetState: useSetAuthLayoutState,
} = createStatesContext<AuthLayoutStates>();

export {
  AuthLayoutStatesProvider, useDefineAuthLayoutMethod, useGetAuthLayoutState, useInitAuthLayoutState,
  useSetAuthLayoutState
};
