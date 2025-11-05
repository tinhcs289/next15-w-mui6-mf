"use client";

import { memo, useCallback } from "react";
import { useGetState, useInitState } from "./context";
import unionBy from "./helpers/unionBy";
import type { SortOperator } from "./types";

export const UpdateSortInitializer = memo(() => {
  const currentSortBy = useGetState((s) => s?.sortBy);
  const fetchData = useGetState((s) => s?.fetchData);

  const updateSort = useCallback(
    (by: SortOperator[], keepCurrentSorting: boolean = false) => {
      if (!by?.length) return;
      const sortBy = keepCurrentSorting
        ? unionBy([...(currentSortBy ?? []), ...by], "by")
        : by;

      fetchData?.({ sortBy }, { by: "payload-and-current-states" });
    },
    [currentSortBy, fetchData]
  );

  useInitState("updateSort", updateSort, {
    when: "whenever-value-changes",
  });

  return null;
});
UpdateSortInitializer.displayName = "UpdateSortInitializer";
