"use client";

import type { JSX } from "react";
import type { MainLayoutStates } from "../types";
import { useInitMainLayoutState } from "./context";

export function ZoneNameInitializer({
  state,
}: {
  state: MainLayoutStates["zoneName"];
}) {
  useInitMainLayoutState("zoneName", state, {
    when: "whenever-value-changes",
  });
  return null as unknown as JSX.Element;
}