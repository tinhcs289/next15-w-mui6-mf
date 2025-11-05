"use client";

import { createStatesContext } from "@shared/states-context";
import type { AuthLayoutStates } from "../types";

const {
  StatesProvider: AuthLayoutStatesProvider,
  useGetState: useGetAuthLayoutState,
  useCallbackState: useAuthLayoutCallback,
  useInitState: useInitAuthLayoutState,
  useSetState: useSetAuthLayoutState,
} = createStatesContext<AuthLayoutStates>();

export {
  AuthLayoutStatesProvider, useAuthLayoutCallback, useGetAuthLayoutState, useInitAuthLayoutState,
  useSetAuthLayoutState
};
