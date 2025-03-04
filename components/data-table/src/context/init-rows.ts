"use client";

import type { JSX } from "react";
import { memo } from "react";
import { useInitState } from "./context-states";
import { Any, TableStates } from "../types";

export const RowsInitializer = memo(
  ({ state }: { state?: TableStates["rows"] }) => {
    useInitState("rows", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  state,
}: {
  state?: TableStates<RowData>["rows"];
}) => JSX.Element;
// @ts-ignore
RowsInitializer.displayName = "RowsInitializer";

export const RowIdentityInitializer = memo(({ state }: { state?: string }) => {
  useInitState("rowIdentity", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
RowIdentityInitializer.displayName = "RowIdentityInitializer";

export const RowCompositionsInitializer = memo(
  ({ state }: { state?: TableStates["rowCompositions"] }) => {
    useInitState("rowCompositions", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  state,
}: {
  state?: TableStates<RowData>["rowCompositions"];
}) => JSX.Element;
// @ts-ignore
RowCompositionsInitializer.displayName = "RowCompositionsInitializer";
