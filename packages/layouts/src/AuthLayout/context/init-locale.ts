"use client";

import type { JSX } from "react";
import type { AuthLayoutStates } from "../types";
import { useInitAuthLayoutState } from "./context";

export function LocaleInitializer({
  state,
}: {
  state: AuthLayoutStates["locale"];
}) {
  useInitAuthLayoutState("locale", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}