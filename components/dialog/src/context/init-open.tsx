"use client";

import { memo } from "react";
import { useInitStateDialog } from "./context";

export const DialogOpenInitializer = memo(
  ({ state }: { state?: boolean }) => {
    useInitStateDialog("open", state, {
      when: "whenever-value-changes",
    });
    return null;
  }
);
DialogOpenInitializer.displayName = "DialogOpenInitializer";
