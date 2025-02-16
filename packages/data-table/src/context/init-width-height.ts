"use client";

import type { JSX } from "react";
import { memo } from "react";
import { useInitState } from "./context";

export const WidthInitializer = memo(({ state = 0 }: { state?: number }) => {
  useInitState("tableWidth", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
WidthInitializer.displayName = "WidthInitializer";

export const HeightInitializer = memo(({ state = 0 }: { state?: number }) => {
  useInitState("tableHeight", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
HeightInitializer.displayName = "HeightInitializer";
