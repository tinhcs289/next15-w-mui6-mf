"use client";

import type { SxProps, Theme } from "@mui/material";
import type { JSX } from "react";
import { forwardRef } from "react";
import S from "./Slots";
import { useGetState } from "../context";
import type { Any, SlotProps } from "../types";

const VirtuosoMuiTable = forwardRef<HTMLTableElement, SlotProps<Any>["table"]>(
  ({ children, ...props }, ref) => {
    const height = useGetState((s) => s?.tableHeight || 0);
    const tableProps = useGetState((s) => s?.slotProps?.table);
    const Slot = useGetState((s) => s?.slots?.table);
    const Component = Slot || S.Table;
    return (
      <Component
        size="small"
        padding="none"
        {...props}
        {...tableProps}
        sx={
          {
            ...props?.sx,
            ...tableProps?.sx,
            height: `${height}px`,
            transition: "all ease 0.3s",
          } as SxProps<Theme>
        }
        ref={ref}
      >
        {/* <ColGroup /> */}
        {children}
      </Component>
    );
  }
) as <RowData extends Any = Any>(
  props: SlotProps<RowData>["table"]
) => JSX.Element;
// @ts-ignore
VirtuosoMuiTable.displayName = "VirtuosoMuiTable";

export default VirtuosoMuiTable;