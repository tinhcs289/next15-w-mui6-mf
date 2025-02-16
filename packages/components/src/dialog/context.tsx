"use client";

import { createStatesContext } from "@shared/utils-react/states-context";
import { memo, useCallback } from "react";
import type { DialogStates } from "./types";

const {
  StatesProvider,
  useGetState: useGetStateDialog,
  useInitState: useInitStateDialog,
  useSetState: useSetStateDialog,
} = createStatesContext<DialogStates>({
  loading: false,
});

export {
  StatesProvider,
  useGetStateDialog,
  useInitStateDialog,
  useSetStateDialog,
};

export const LoadingInitializer = memo(function Initializer({
  loading,
}: {
  loading?: boolean;
}) {
  useInitStateDialog("loading", loading, {
    when: "whenever-value-changes",
  });
  return null;
});
LoadingInitializer.displayName = "Dialog:LoadingInitializer";

export const OnCloseInitializer = memo(function Initializer({
  onClose,
}: {
  onClose?: DialogStates["onClose"];
}) {
  const handleOnClose: Required<DialogStates>["onClose"] = useCallback(
    ({ reason, data }) => {
      onClose?.({ reason, data });
    },
    [onClose]
  );
  useInitStateDialog("onClose", handleOnClose, {
    when: "whenever-value-changes",
  });
  return null;
});
OnCloseInitializer.displayName = "Dialog:OnCloseInitializer";
