"use client";

import { useMemo } from "react";
import { Any, ColumnVisibility } from "../types";
import { useGetState } from "./context";

export function useGetColumnVisibility<RowData extends Any = Any>(
  fieldOrId?: string
): ColumnVisibility<RowData> {
  const visibilites = useGetState((s) => s?.columnVisibilities) as
    | ColumnVisibility<RowData>[]
    | undefined;

  return useMemo(() => {
    if (!fieldOrId) return {};
    if (!visibilites?.length) return {};
    return (visibilites.find(
      (c) => c.id === fieldOrId || c.field === fieldOrId
    ) || {}) as ColumnVisibility<RowData>;
  }, [visibilites, fieldOrId]);
}
