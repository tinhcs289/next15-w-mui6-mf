"use client";

import { createStatesContext } from "@shared/states-context";
import type { AdminLayoutStates } from "../types";

const {
  StatesProvider: AdminLayoutStatesProvider,
  useGetState: useGetAdminLayoutState,
  useCallbackState: useAdminLayoutCallback,
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
  AdminLayoutStatesProvider, useAdminLayoutCallback, useGetAdminLayoutState, useInitAdminLayoutState,
  useSetAdminLayoutState
};
