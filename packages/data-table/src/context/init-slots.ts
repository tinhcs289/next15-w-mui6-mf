"use client";

import type { JSX } from "react";
import { memo } from "react";
import type { Any, TableStates } from "../types";
import { useInitState } from "./context";

export const SlotsInitializer = memo(
  ({ state }: { state?: TableStates["slots"] }) => {
    useInitState("slots", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  state,
}: {
  state?: TableStates<RowData>["slots"];
}) => JSX.Element;
// @ts-ignore
SlotsInitializer.displayName = "SlotsInitializer";

export const SlotPropsInitializer = memo(
  ({ state }: { state?: TableStates["slotProps"] }) => {
    useInitState("slotProps", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  state,
}: {
  state?: TableStates<RowData>["slotProps"];
}) => JSX.Element;
// @ts-ignore
SlotPropsInitializer.displayName = "SlotPropsInitializer";

export const EmptyDisplayInitializer = memo(
  ({ state }: { state?: TableStates["emptyDisplay"] }) => {
    useInitState("emptyDisplay", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
);
EmptyDisplayInitializer.displayName = "EmptyDisplayInitializer";

export const LoadingDisplayInitializer = memo(
  ({ state }: { state?: TableStates["loadingDisplay"] }) => {
    useInitState("loadingDisplay", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
);
LoadingDisplayInitializer.displayName = "LoadingDisplayInitializer";
