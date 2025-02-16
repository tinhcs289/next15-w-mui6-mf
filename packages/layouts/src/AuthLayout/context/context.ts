"use client";

import { createStatesContext } from "@shared/utils-react/states-context";
import type { AuthLayoutStates } from "../types";

const {
  StatesProvider: AuthLayoutStatesProvider,
  useGetState: useGetAuthLayoutState,
  useDefineMethod: useDefineAuthLayoutMethod,
  useInitState: useInitAuthLayoutState,
  useSetState: useSetAuthLayoutState,
} = createStatesContext<AuthLayoutStates>();

export {
  AuthLayoutStatesProvider, useDefineAuthLayoutMethod, useGetAuthLayoutState, useInitAuthLayoutState,
  useSetAuthLayoutState
};
