"use client";

import type { JSX } from "react";
import type { AuthLayoutStates } from "../types";
import { useInitAuthLayoutState } from "./context";

export function ZoneNameInitializer({
  state,
}: {
  state: AuthLayoutStates["zoneName"];
}) {
  useInitAuthLayoutState("zoneName", state, {
    when: "whenever-value-changes",
  });
  return null as unknown as JSX.Element;
}