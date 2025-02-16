"use client";

import type { JSX } from "react";
import { memo } from "react";
import { useInitState } from "./context";

export const LoadingInitializer = memo(({ state }: { state?: boolean }) => {
  useInitState("loading", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
LoadingInitializer.displayName = "LoadingInitializer";
