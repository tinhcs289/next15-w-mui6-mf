"use client";

import { useContext, useMemo } from "react";
import { SortableItemContext } from "./context-dnd-columns";
import { useGetState } from "./context-states";

export function useHeaderDndHandle() {
  const {
    attributes,
    listeners,
    ref: handleRef,
  } = useContext(SortableItemContext);
  const enable = useGetState((s) => !!s?.columnsReOrder);

  const handleProps = useMemo(
    () => ({
      ...attributes,
      ...listeners,
    }),
    [attributes, listeners]
  );

  return { enable, handleProps, handleRef };
}