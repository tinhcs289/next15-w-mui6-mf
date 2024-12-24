"use client";

import Box from "@mui/material/Box";
import type { ForwardedRef, JSX } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import type { Any, TableProps } from "./base.types";
import { HeightInitializer, WidthInitializer, withStates } from "./context";
import { createTableHeadComponent } from "./create-table-head-component";
import { createBodyRowComponent } from "./create-table-row-component";
import { createVirtuosoComponents } from "./create-virtuoso-components";
import { useBlockScrollingWhileDraggingElement } from "./use-block-scroll-while-dragging-element";
import { useDetectIsScrolling } from "./use-detect-is-scrolling";
import { useWatchElementWidthHeight } from "./use-watch-element-width-height";

const Table = withStates(
  forwardRef<HTMLDivElement, TableProps>(
    (
      {
        columns,
        rows = [],
        slots,
        slotProps,
        emptyDisplay,
        virtuosoProps,
        onColumnsReOrder,
        ...props
      },
      ref
    ) => {
      const totalCount = useMemo(() => rows?.length || 0, [rows?.length]);

      const [innerRef, elementWidth, elementHeight] =
        useWatchElementWidthHeight<HTMLDivElement>();
      useImperativeHandle(ref, () => innerRef.current!, []);

      const components = useMemo(
        () => createVirtuosoComponents({ slots, slotProps, emptyDisplay }),
        [slots, slotProps, emptyDisplay]
      );

      const fixedHeaderContent = useMemo(
        () =>
          createTableHeadComponent({
            component: slots?.headRow,
            props: slotProps?.headRow,
            onColumnsReOrder,
          }),
        [slots?.headRow, slotProps?.headRow]
      );

      const { detectIsScrolling } = useDetectIsScrolling();
      const { handleScroll } = useBlockScrollingWhileDraggingElement();

      return (
        <Box width="100%" {...props} ref={innerRef}>
          <WidthInitializer state={elementWidth} />
          <HeightInitializer state={elementHeight} />
          <TableVirtuoso
            {...virtuosoProps}
            isScrolling={detectIsScrolling}
            onScroll={handleScroll}
            data={rows}
            totalCount={totalCount}
            components={components}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={createBodyRowComponent}
          />
        </Box>
      );
    }
  ) as any
) as <RowData extends Any = Any>(
  props: TableProps<RowData> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element;

// @ts-ignore
Table.displayName = "Table";

export { Table };
