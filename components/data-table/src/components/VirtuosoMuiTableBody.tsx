"use client";

import type { SxProps, Theme } from "@mui/material";
import type { JSX } from "react";
import { forwardRef } from "react";
import S from "./Slots";
import { useGetState } from "../context";
import type { Any, SlotProps } from "../types";

const VirtuosoMuiTableBody = forwardRef<
  HTMLTableSectionElement,
  SlotProps<Any>["body"]
>(({ children, ...props }, ref) => {
  const bodyProps = useGetState((s) => s?.slotProps?.body);
  const Slot = useGetState((s) => s?.slots?.body);
  const Component = Slot || S.Body;
  return (
    <Component
      {...props}
      {...bodyProps}
      sx={
        {
          ...props?.sx,
          ...bodyProps?.sx,
        } as SxProps<Theme>
      }
      ref={ref}
    >
      {children}
    </Component>
  );
}) as <RowData extends Any = Any>(
  props: SlotProps<RowData>["body"]
) => JSX.Element;
// @ts-ignore
VirtuosoMuiTableBody.displayName = "VirtuosoMuiTableBody";

export default VirtuosoMuiTableBody;
