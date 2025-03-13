"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import debounce from "lodash/debounce";
import type { ComponentType } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useGetColumnVisibility, useSetColumnWidth } from "../context";

export type ColumnResizeBarProps = BoxProps<"div"> & {
  ["data-column-id"]?: string;
};

const ColumnResizeBar = styled(
  forwardRef<HTMLDivElement, ColumnResizeBarProps>(
    ({ ["data-column-id"]: columnId, className, ...props }, ref) => {
      const { initialWidth } = useGetColumnVisibility(columnId);

      const resizeBarRef = useRef<HTMLDivElement>(null);
      useImperativeHandle(ref, () => resizeBarRef.current!, []);

      const setColumnWidth = useSetColumnWidth();

      useEffect(() => {
        if (!resizeBarRef?.current) return;
        const minWidth = initialWidth || 64;

        const updateWidth = debounce((w: number) => {
          setColumnWidth?.(columnId as string, w);
        }, 300);

        const bar = resizeBarRef.current as HTMLElement;
        const content = bar.parentElement as HTMLElement;
        const cell = content.parentElement as HTMLElement;

        let pageX: number | undefined,
          columnWidth: number | undefined,
          isResizing = false;

        function onMouseDown(e: MouseEvent) {
          e?.stopPropagation?.();
          e?.preventDefault?.();
          isResizing = true;
          pageX = e.pageX;
          columnWidth = cell.offsetWidth;
        }

        bar.addEventListener("mousedown", onMouseDown);

        function onMouseMove(e: MouseEvent) {
          if (!isResizing) return;
          const diffX = e.pageX - (pageX || 0);
          if (!diffX) return;
          const newWidth = (columnWidth || 0) + diffX;

          if (newWidth <= minWidth) return;

          cell.style.width =  `${newWidth}px`;
          cell.style.minWidth =  `${newWidth}px`;
          cell.style.maxWidth =  `${newWidth}px`;

          content.style.width =`${newWidth}px`;
          content.style.minWidth =`${newWidth}px`;
          content.style.maxWidth =`${newWidth}px`;

          updateWidth(newWidth);
        }

        window.addEventListener("mousemove", onMouseMove);

        function onMouseUp(e: MouseEvent) {
          if (!isResizing) return;
          isResizing = false;
          columnWidth = undefined;
          pageX = undefined;
        }

        window.addEventListener("mouseup", onMouseUp);

        return () => {
          bar.removeEventListener("mousedown", onMouseDown);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
      }, [columnId, initialWidth]);

      return (
        <Box
          component="div"
          {...props}
          className={`col-resize-bar ${className || ""}`}
          ref={resizeBarRef}
        />
      );
    }
  ) as typeof Box
)<ColumnResizeBarProps>(({ theme }) => ({
  position: "absolute",
  cursor: "col-resize",
  userSelect: "none",
  top: "50%",
  transform: "translateY(-50%)",
  right: 0,
  width: "2px",
  height: "70%",
  opacity: 0,
  background: theme.palette.grey[300],
  transition: "all ease 0.3s",
  zIndex: 4,
  ["&:hover"]: {
    zIndex: 9999,
    background: theme.palette.primary.main,
    height: 9999,
    opacity: 1,
    width: "5px",
    boxSizing: "border-box",
  },
})) as ComponentType<ColumnResizeBarProps>;
ColumnResizeBar.displayName = "ColumnResizeBar";

export default ColumnResizeBar;
