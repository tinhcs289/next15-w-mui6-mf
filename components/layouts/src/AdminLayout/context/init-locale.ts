"use client";

import type { JSX } from "react";
import type { AdminLayoutStates } from "../types";
import { useInitAdminLayoutState } from "./context";

export function LocaleInitializer({
  state,
}: {
  state: AdminLayoutStates["locale"];
}) {
  useInitAdminLayoutState("locale", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}