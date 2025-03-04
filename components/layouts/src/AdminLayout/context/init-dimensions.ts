"use client";

import type { JSX } from "react";
import type { AdminLayoutStates } from "../types";
import { useInitAdminLayoutState } from "./context";

export function WidthInitializer({
  state,
}: {
  state: AdminLayoutStates["pageContentWidth"];
}) {
  useInitAdminLayoutState("pageContentWidth", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}

export function HeightInitializer({
  state,
}: {
  state: AdminLayoutStates["pageContentHeight"];
}) {
  useInitAdminLayoutState("pageContentHeight", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
}