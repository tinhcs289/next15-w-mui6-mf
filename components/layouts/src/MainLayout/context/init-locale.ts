"use client";

import type { JSX } from "react";
import type { MainLayoutStates } from "../types";
import { useInitMainLayoutState } from "./context";

export function LocaleInitializer({
  state,
}: {
  state: MainLayoutStates["locale"];
}) {
  useInitMainLayoutState("locale", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}