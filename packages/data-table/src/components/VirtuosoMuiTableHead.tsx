"use client";

import type { SxProps, Theme } from "@mui/material";
import type { JSX } from "react";
import { forwardRef } from "react";
import S from "./Slots";
import { useGetState } from "../context";
import type { Any, SlotProps } from "../types";

const VirtuosoMuiTableHead = forwardRef<
  HTMLTableSectionElement,
  SlotProps<Any>["head"]
>(({ children, ...props }, ref) => {
  const headProps = useGetState((s) => s?.slotProps?.head);
  const Slot = useGetState((s) => s?.slots?.head);
  const Component = Slot || S.Head;
  return (
    <Component
      {...props}
      {...headProps}
      sx={
        {
          ...props?.sx,
          ...headProps?.sx,
        } as SxProps<Theme>
      }
      ref={ref}
    >
      {children}
    </Component>
  );
}) as <RowData extends Any = Any>(
  props: SlotProps<RowData>["head"]
) => JSX.Element;
// @ts-ignore
VirtuosoMuiTableHead.displayName = "VirtuosoMuiTableHead";

export default VirtuosoMuiTableHead;
