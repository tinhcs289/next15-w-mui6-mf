"use client";

import { createStatesContext } from "@packages/states-context";
import type { DialogStates } from "../types";

const {
  StatesProvider: DialogStatesProvider,
  useGetState: useGetStateDialog,
  useInitState: useInitStateDialog,
  useSetState: useSetStateDialog,
} = createStatesContext<DialogStates>({
  open: false,
  loading: false,
});

export {
  DialogStatesProvider,
  useGetStateDialog,
  useInitStateDialog,
  useSetStateDialog
};
