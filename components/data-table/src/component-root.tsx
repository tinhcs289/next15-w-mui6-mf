"use client";

import Box from "@mui/material/Box";
import type { JSX } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { HeightInitializer, WidthInitializer, withStates } from "./context";
import { useBlockScrollingWhileDraggingElement } from "./hooks/use-block-scroll-while-dragging-element";
import { useDetectIsScrolling } from "./hooks/use-detect-is-scrolling";
import { useWatchElementWidthHeight } from "./hooks/use-watch-element-width-height";
import type { Any, DataTableProps } from "./types";
import { components, fixedHeaderContent, itemContent } from "./virtuoso";

const DataTable = withStates(
  forwardRef<HTMLDivElement, DataTableProps>(
    ({ virtuosoProps, rows = [], ...boxProps }, ref) => {
      const $totalCount = useMemo(() => rows?.length || 0, [rows?.length]);

      const [innerRef, width, height] =
        useWatchElementWidthHeight<HTMLDivElement>({
          excludeVerticalScrollbar: true,
        });

      useImperativeHandle(ref, () => innerRef.current!, []);

      const { detectIsScrolling } = useDetectIsScrolling();
      const { handleScroll } = useBlockScrollingWhileDraggingElement();

      const tableHeight = useMemo(() => {
        return height - 0 - 0;
      }, [height]);

      return (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          {...boxProps}
          ref={innerRef}
        >
          <WidthInitializer state={width} />
          <HeightInitializer state={height} />
          <TableVirtuoso
            {...virtuosoProps}
            isScrolling={detectIsScrolling}
            onScroll={handleScroll}
            height={tableHeight}
            style={{ flex: 1 }}
            totalCount={$totalCount}
            data={rows}
            components={components}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
          />
        </Box>
      );
    }
  ) as any
) as <RowData extends Any = Any>(props: DataTableProps<RowData>) => JSX.Element;

// @ts-ignore
DataTable.displayName = "DataTable";

export { DataTable };
