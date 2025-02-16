"use client";

import type { JSX } from "react";
import { memo, useMemo } from "react";
import type { Any, ColumnDef, ColumnVisibility, TableStates } from "../types";
import { useGetState, useInitState } from "./context";

export const ColumnDefsInitializer = memo(
  ({ state }: { state?: ColumnDef[] }) => {
    useInitState("columns", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  state,
}: {
  state?: ColumnDef<RowData>[];
}) => JSX.Element;
// @ts-ignore
ColumnDefsInitializer.displayName = "ColumnDefsInitializer";

export const ColumnsReOrderInitializer = memo(
  ({ state }: { state?: boolean }) => {
    useInitState("columnsReOrder", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
);
ColumnsReOrderInitializer.displayName = "ColumnsReOrderInitializer";

export const OnColumnsReOrderInitializer = memo(
  ({ state }: { state?: TableStates["onColumnsReOrder"] }) => {
    useInitState("onColumnsReOrder", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  state,
}: {
  state?: TableStates<RowData>["onColumnsReOrder"];
}) => JSX.Element;
// @ts-ignore
OnColumnsReOrderInitializer.displayName = "OnColumnsReOrderInitializer";

export const ColumnVisibilitiesInitializer = memo(() => {
  const tableWidth = useGetState((s) => s?.tableWidth);
  const columns = useGetState((s) => s?.columns);

  const { t: totalFixedColumns, w: totalWidthOfFixedColumns } = useMemo(() => {
    if (!columns?.length) return { t: 0, w: 0 };
    const fixedColumns = columns.filter((c) => Number.isInteger(c.width));
    if (!fixedColumns?.length) return { t: 0, w: 0 };
    return {
      t: fixedColumns.length,
      w: fixedColumns.reduce((w, c) => w + (c.width as number), 0),
    };
  }, [columns]);

  const totalWidthOfFreeSizeColumns = useMemo(
    () => (tableWidth || 0) - totalWidthOfFixedColumns,
    [tableWidth, totalWidthOfFixedColumns]
  );

  useInitState("totalWidthOfFreeSizeColumns", totalWidthOfFreeSizeColumns, {
    when: "whenever-value-changes",
  });

  const totalFreeColumns = useMemo(
    () => (!columns?.length ? 0 : columns.length - totalFixedColumns),
    [columns?.length, totalFixedColumns]
  );

  const averageWidthOfFreeSizeColumn = useMemo(
    () =>
      totalFreeColumns === 1
        ? totalWidthOfFreeSizeColumns
        : Math.round(totalWidthOfFreeSizeColumns / totalFreeColumns),
    [totalWidthOfFreeSizeColumns, totalFreeColumns]
  );

  useInitState("averageWidthOfFreeSizeColumn", averageWidthOfFreeSizeColumn, {
    when: "whenever-value-changes",
  });

  const columnVisibilities = useMemo(() => {
    if (!columns?.length) return [];
    let left = 0;

    let visibilities = columns.map(({ id, field, width, head, sticky, sortable, defaultSortDirection }) => {
      const actualWidth =
        typeof width === "number" ? width : averageWidthOfFreeSizeColumn;
      const visibility: ColumnVisibility = {
        head,
        id,
        field,
        sticky,
        initialWidth: width,
        width: actualWidth,
        visible: true,
        sortable,
        defaultSortDirection,
        left,
      };
      left = left + actualWidth;
      return visibility;
    });

    let right = visibilities.reduce(
      (totalRight, visibility) => totalRight + (visibility.width || 0),
      0
    );

    visibilities = visibilities.map((visibility) => {
      const v = {
        ...visibility,
        right: right,
      };
      right = right - (visibility.width || 0);
      return v;
    });

    return visibilities;
  }, [columns, averageWidthOfFreeSizeColumn]);

  useInitState("columnVisibilities", columnVisibilities, {
    when: "whenever-value-changes",
  });

  return null as unknown as JSX.Element;
});
ColumnVisibilitiesInitializer.displayName = "ColumnVisibilitiesInitializer";
