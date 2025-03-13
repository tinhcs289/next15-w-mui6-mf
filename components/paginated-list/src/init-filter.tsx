"use client";

import { memo, useCallback } from "react";
import { useGetState, useInitState } from "./context";
import type { ListFilter } from "./types";

export const UpdateFilternitializer = memo(() => {
  const fetchData = useGetState((s) => s?.fetchData);

  const updateFilter = useCallback(
    (filter: ListFilter, keepCurrentFilter = true) => {
      if (typeof filter !== "object" || !Object.keys(filter).length) return;
      fetchData?.(
        {
          advanceFilter: { ...filter },
        },
        {
          by: keepCurrentFilter ? "payload-and-current-states" : "payload-only",
        }
      );
    },
    [fetchData]
  );

  useInitState("updateFilter", updateFilter, {
    when: "whenever-value-changes",
  });

  return null;
});
UpdateFilternitializer.displayName = "UpdateFilternitializer";