"use client";

import type { JSX } from "react";
import type { AdminLayoutStates } from "../types";
import { useInitAdminLayoutState } from "./context";

export function CurrentUrlInitializer({
  state,
}: {
  state: AdminLayoutStates["currentUrl"];
}) {
  useInitAdminLayoutState("currentUrl", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}
