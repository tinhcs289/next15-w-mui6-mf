"use client";

import { createStatesContext } from "@shared/utils-react/states-context";
import type { MainLayoutStates } from "../types";

const {
  StatesProvider: MainLayoutStatesProvider,
  useGetState: useGetMainLayoutState,
  useDefineMethod: useDefineMainLayoutMethod,
  useInitState: useInitMainLayoutState,
  useSetState: useSetMainLayoutState,
} = createStatesContext<MainLayoutStates>({ openAppbarDrawer: false });

export {
  MainLayoutStatesProvider,
  useDefineMainLayoutMethod,
  useGetMainLayoutState,
  useInitMainLayoutState,
  useSetMainLayoutState
};
