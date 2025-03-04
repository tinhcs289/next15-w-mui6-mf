"use client";

import { memo, useCallback } from "react";
import { useGetState, useInitState } from "./context";

export const UpdatePagingInitializer = memo(() => {
  const pageSize = useGetState((s) => s?.pageSize || 20);
  const fetchData = useGetState((s) => s?.fetchData);

  const updatePaging = useCallback(
    (page: number, size?: number) => {
      if (!page) return;
      fetchData?.(
        { pageIndex: page || 1, pageSize: size || pageSize },
        { by: "payload-and-current-states" }
      );
    },
    [pageSize, fetchData]
  );

  useInitState("updatePaging", updatePaging, {
    when: "whenever-value-changes",
  });

  return null;
});
UpdatePagingInitializer.displayName = "UpdatePagingInitializer";
