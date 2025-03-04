"use client";

import unionBy from "lodash/unionBy";
import { memo, useCallback } from "react";
import { useGetState, useInitState } from "./context";
import type { SortOperator } from "./types";

export const UpdateSortInitializer = memo(() => {
  const sortBy = useGetState((s) => s?.sortBy);
  const fetchData = useGetState((s) => s?.fetchData);

  const updateSort = useCallback(
    (by: SortOperator[], keepCurrentSorting: boolean = false) => {
      if (!by?.length) return;
      fetchData?.(
        {
          sortBy: !keepCurrentSorting
            ? by
            : unionBy([...(sortBy || []), ...by], "by"),
        },
        { by: "payload-and-current-states" }
      );
    },
    [sortBy, fetchData]
  );

  useInitState("updateSort", updateSort, {
    when: "whenever-value-changes",
  });

  return null;
});
UpdateSortInitializer.displayName = "UpdateSortInitializer";