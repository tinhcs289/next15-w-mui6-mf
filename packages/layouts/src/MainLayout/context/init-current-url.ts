"use client";

import type { JSX } from "react";
import type { MainLayoutStates } from "../types";
import { useInitMainLayoutState } from "./context";

export function CurrentUrlInitializer({
  state,
}: {
  state: MainLayoutStates["currentUrl"];
}) {
  useInitMainLayoutState("currentUrl", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}
