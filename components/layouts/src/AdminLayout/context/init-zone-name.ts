"use client";

import type { JSX } from "react";
import type { AdminLayoutStates } from "../types";
import { useInitAdminLayoutState } from "./context";

export function ZoneNameInitializer({
  state,
}: {
  state: AdminLayoutStates["zoneName"];
}) {
  useInitAdminLayoutState("zoneName", state, {
    when: "whenever-value-changes",
  });
  return null as unknown as JSX.Element;
}