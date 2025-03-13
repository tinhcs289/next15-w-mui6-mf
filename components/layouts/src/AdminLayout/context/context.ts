"use client";

import { createStatesContext } from "@shared/states-context";
import type { AdminLayoutStates } from "../types";

const {
  StatesProvider: AdminLayoutStatesProvider,
  useGetState: useGetAdminLayoutState,
  useCallbackState: useDefineAdminLayoutMethod,
  useInitState: useInitAdminLayoutState,
  useSetState: useSetAdminLayoutState,
} = createStatesContext<AdminLayoutStates>({
  openAppbarDrawer: false,
  pageContentHeight: {
    full: 0,
    visible: 0,
  },
  pageContentWidth: {
    full: 0,
    visible: 0,
  },
});

export {
  AdminLayoutStatesProvider, useDefineAdminLayoutMethod, useGetAdminLayoutState, useInitAdminLayoutState,
  useSetAdminLayoutState
};
