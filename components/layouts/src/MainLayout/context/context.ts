"use client";

import { createStatesContext } from "@packages/states-context";
import type { MainLayoutStates } from "../types";

const {
  StatesProvider: MainLayoutStatesProvider,
  useGetState: useGetMainLayoutState,
  useCallbackState: useMainLayoutCallback,
  useInitState: useInitMainLayoutState,
  useSetState: useSetMainLayoutState,
} = createStatesContext<MainLayoutStates>({ openAppbarDrawer: false });

export {
  MainLayoutStatesProvider,
  useMainLayoutCallback,
  useGetMainLayoutState,
  useInitMainLayoutState,
  useSetMainLayoutState
};
