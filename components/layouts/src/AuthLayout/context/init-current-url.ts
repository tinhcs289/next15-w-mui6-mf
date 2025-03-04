"use client";

import type { JSX } from "react";
import type { AuthLayoutStates } from "../types";
import { useInitAuthLayoutState } from "./context";

export function CurrentUrlInitializer({
  state,
}: {
  state: AuthLayoutStates["currentUrl"];
}) {
  useInitAuthLayoutState("currentUrl", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}
