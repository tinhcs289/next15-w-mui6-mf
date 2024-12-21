"use client";

import Box from "@mui/material/Box";
import type { ForwardedRef, JSX, Ref } from "react";
import { forwardRef, useMemo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import type { Any, TableProps } from "./base.types";
import { ColDefsInit, StatesProvider } from "./context";
import { createVirtuosoComponents } from "./create-virtuoso-components";
import { fixedHeaderContent } from "./fixex-header-content";
import { itemContent } from "./item-content";

const Table = forwardRef(
  <RowData extends Any = Any>(
    {
      columns,
      data = [],
      height = "500px",
      slots,
      slotProps,
      virtuosoProps,
      ...props
    }: TableProps<RowData>,
    ref?: Ref<HTMLDivElement>
  ) => {
    const $components = useMemo(
      () => createVirtuosoComponents<RowData>({ slots, slotProps }),
      [slots, slotProps]
    );

    const $fixedHeaderContent = useMemo(
      () =>
        fixedHeaderContent({
          component: slots?.headRow,
          props: slotProps?.headRow,
        }),
      [slots?.headRow, slotProps?.headRow]
    );

    return (
      <StatesProvider>
        <ColDefsInit state={columns as any} />
        <Box width="100%" ref={ref} height={height} {...props}>
          <TableVirtuoso
            data={data}
            components={$components}
            itemContent={itemContent}
            fixedHeaderContent={$fixedHeaderContent}
            {...virtuosoProps}
          />
        </Box>
      </StatesProvider>
    );
  }
) as <RowData extends Any = Any>(
  props: TableProps<RowData> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element;

// @ts-ignore
Table.displayName = "Table";

export { Table };
