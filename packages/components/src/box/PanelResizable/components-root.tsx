"use client";

import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import type { ComponentType } from "react";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import {
  BoxItem,
  BoxItemLast,
  BoxSpliter,
  BoxStack,
} from "./components-styled";
import { PanelResizableContext } from "./context";
import {
  PanelProps,
  PanelResizableContextValues,
  PanelResizableGroupProps,
  PanelResizableProps,
  ResizeSplitterProps,
  UseResizableLayoutParams,
} from "./types";
import { useResizableLayout } from "./use-resizable-layout";
import { useWatchElementDimesions } from "./use-watch-element-dimesions";

export const ResizeSplitter = forwardRef<HTMLDivElement, ResizeSplitterProps>(
  ({ id, axis, isDragging, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const focus = useCallback(() => {
      setIsFocused(true);
    }, []);
    const outFocus = useCallback(() => {
      setIsFocused(false);
    }, []);
    return (
      <BoxSpliter
        {...props}
        component="div"
        id={id}
        ref={ref}
        data-testid={id}
        tabIndex={0}
        onFocus={focus}
        onBlur={outFocus}
        axis={axis}
        isDragging={isDragging || isFocused}
      />
    );
  }
) as ComponentType<ResizeSplitterProps>;
ResizeSplitter.displayName = "ResizeSplitter";

export const PanelResizableGroup = forwardRef<HTMLDivElement, PanelResizableGroupProps>(
  ({ children, sx, axis = "x", item = false, ...props }, ref) => {
    return (
      <BoxStack
        {...props}
        component="div"
        sx={{
          ...sx,
          flexDirection: axis === "y" ? "column" : "row",
          ...(!!item
            ? {
                height: "100%",
                width: "100%",
              }
            : {}),
        }}
        ref={ref}
      >
        {children}
      </BoxStack>
    );
  }
) as ComponentType<PanelResizableGroupProps>;
PanelResizableGroup.displayName = "PanelResizableGroup";

export const PanelResizable = forwardRef<HTMLDivElement, PanelResizableProps>(
  (
    {
      children,
      splitterPosition = "end",
      resizeOptions = {} as UseResizableLayoutParams,
      sx,
      ...props
    },
    ref
  ) => {
    const [innerRef, width, height] = useWatchElementDimesions<HTMLDivElement>();
    useImperativeHandle(ref, () => innerRef.current!, []);

    const contextValues: PanelResizableContextValues = useMemo(
      () => ({ axis: resizeOptions.axis, width, height }),
      [resizeOptions.axis, width, height]
    );

    const {
      isDragging: isLeftDragging,
      position: widthOrHeight,
      splitterProps: leftDragBarProps,
    } = useResizableLayout({
      ...resizeOptions,
      reverse: splitterPosition === "start",
    });

    const $SplitterForLeftSide = useMemo(
      () => (
        <ResizeSplitter
          isDragging={isLeftDragging}
          axis={resizeOptions.axis}
          {...leftDragBarProps}
        />
      ),
      [isLeftDragging, leftDragBarProps]
    );

    const $sx: SxProps<Theme> = useMemo(
      () => ({
        ...sx,
        ...(resizeOptions.axis === "y"
          ? {
              height: `${widthOrHeight}px`,
              maxHeight: `${widthOrHeight}px`,
              minHeight: `${widthOrHeight}px`,
            }
          : {
              width: `${widthOrHeight}px`,
              maxWidth: `${widthOrHeight}px`,
              minWidth: `${widthOrHeight}px`,
            }),
      }),
      [sx, resizeOptions.axis, widthOrHeight]
    );

    return (
      <PanelResizableContext.Provider value={contextValues}>
        {splitterPosition === "start" ? $SplitterForLeftSide : null}
        <BoxItem {...props} component="div" ref={innerRef} sx={$sx}>
          {children}
        </BoxItem>
        {splitterPosition === "end" ? $SplitterForLeftSide : null}
      </PanelResizableContext.Provider>
    );
  }
) as ComponentType<PanelResizableProps>;
PanelResizable.displayName = "PanelResizable";

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, ...props }, ref) => {
    const [innerRef, width, height] = useWatchElementDimesions<HTMLDivElement>();
    useImperativeHandle(ref, () => innerRef.current!, []);

    const contextValues: PanelResizableContextValues = useMemo(
      () => ({ width, height }),
      [width, height]
    );
    return (
      <PanelResizableContext.Provider value={contextValues}>
        <BoxItemLast {...props} component="div" ref={innerRef}>
          {children}
        </BoxItemLast>
      </PanelResizableContext.Provider>
    );
  }
) as ComponentType<PanelProps>;
Panel.displayName = "Panel";
