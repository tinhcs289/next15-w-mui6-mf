"use client";

import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";
import type { TableStates } from "../types";
import { useSetState } from "./context";

export function useSetColumnWidth() {
  const setState = useSetState();
  return useCallback((fieldOrId: string, width: number) => {
    setState(states => {
      if (!states?.columnVisibilities?.length) return states as TableStates;
      let i = states.columnVisibilities.findIndex((c) => c?.id === fieldOrId);
      if (i === -1) {
        i = states.columnVisibilities.findIndex((c) => c?.field === fieldOrId);
      }
      if (i === -1) return states as TableStates;
      const visibilities = cloneDeep(states.columnVisibilities);
      // @ts-ignore
      visibilities[i].width = width;
      return { ...states, columnVisibilities: visibilities } as TableStates
    });
  }, [setState]);
}