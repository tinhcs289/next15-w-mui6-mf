"use client";

import type { SxProps, Theme } from "@mui/material";
import type { JSX } from "react";
import { forwardRef } from "react";
import { useGetState } from "../context";
import type { Any, SlotProps } from "../types";
import LoadingIndicator from "./LoadingIndicator";
import S from "./Slots";

const VirtuosoScroller = forwardRef<HTMLDivElement, SlotProps<Any>["container"]>(
  ({ children, ...props }, ref) => {
    const height = useGetState((s) => s?.tableHeight || 0);
    const containerProps = useGetState((s) => s?.slotProps?.container);
    const Slot = useGetState((s) => s?.slots?.container);
    const Component = Slot || S.Container;
    return (
      <Component
        {...props}
        {...containerProps}
        sx={
          {
            ...props?.sx,
            ...containerProps?.sx,
            height: `${height}px`,
            position: "relative",
            transition: "all ease 0.3s",
          } as SxProps<Theme>
        }
        ref={ref}
      >
        <LoadingIndicator />
        {children}
      </Component>
    );
  }
) as <RowData extends Any = Any>(props: SlotProps<RowData>["container"]) => JSX.Element;
// @ts-ignore
VirtuosoScroller.displayName = "VirtuosoScroller";

export default VirtuosoScroller;