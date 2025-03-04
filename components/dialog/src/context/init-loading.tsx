"use client";

import { memo } from "react";
import { useInitStateDialog } from "./context";

export const DialogLoadingInitializer = memo(
  ({ state }: { state?: boolean }) => {
    useInitStateDialog("loading", state, {
      when: "whenever-value-changes",
    });
    return null;
  }
);
DialogLoadingInitializer.displayName = "DialogLoadingInitializer";
