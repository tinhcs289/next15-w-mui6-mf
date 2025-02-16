"use client";

import type {
  Active,
  DragCancelEvent,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTheme } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { default as S } from "../components";
import ColumnResizeBar from "../components/ColumnResizeBar";
import SortButton from "../components/SortButton";
import { useGetColumnVisibility, useGetState, useSetState } from "../context";
import type { Any, ColumnDef, SlotProps } from "../types";
import {
  DragHandle,
  dropAnimationConfig,
  SortableItemContext,
  useDndColumns,
} from "./create-table-header-draggable";

function RenderCell<RowData extends Any = Any>({
  id,
  field,
  head,
  slot,
  slotProps,
  resizable = false,
  sortable = false,
  defaultSortDirection = "asc",
  sticky,
  isOverlay = false,
}: ColumnDef<RowData> & { isOverlay?: boolean }) {
  const Cell = slot?.headCell || S.HeadCell;
  const CellContent = slot?.headCellContent || S.HeadCellContent;
  const CellContentLabel = slot?.headCellLabel || S.HeadCellLabel;

  const { width, visible } = useGetColumnVisibility(id);
  const widthAvg = useGetState((s) => s?.averageWidthOfFreeSizeColumn);
  const { dndContextValue, setNodeRef, transform, transition, isDragging } =
    useDndColumns(id);

  const theme = useTheme();

  const cellProps: Partial<SlotProps["headCell"]> = useMemo(() => {
    const p = { ...slotProps?.headCell } as SlotProps["headCell"];
    p.width = width || widthAvg || p.width;

    // headcell: "sticky-start", "sticky-end", "resizable", "sortable"

    p["className"] = [
      !!sticky && `sticky-${sticky}`,
      resizable && "resizable",
      sortable && "sortable",
      p?.className,
    ]
      .filter(Boolean)
      .join(" ");

    p["sx"] = {
      ...p["sx"],
      width: `${width || widthAvg || 0}px`,
      minWidth: `${width || widthAvg || 0}px`,
      maxWidth: `${width || widthAvg || 0}px`,
      wordBreak: "break-all",
      "& > div": {
        width: `${width || widthAvg || 0}px`,
        minWidth: `${width || widthAvg || 0}px`,
        maxWidth: `${width || widthAvg || 0}px`,
      },
      opacity: isOverlay ? 1 : isDragging ? 0.4 : undefined,
      color: isOverlay
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
      background: isOverlay
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
      boxShadow: isOverlay ? theme.shadows[4] : undefined,
      border: isOverlay
        ? `1px solid ${theme.palette.primary.main}`
        : isDragging
          ? `1px dashed ${theme.palette.grey[500]}`
          : undefined,
      transform: CSS.Translate.toString(transform),
      transition,
    };
    return p;
  }, [
    width,
    widthAvg,
    isOverlay,
    transform,
    isDragging,
    slotProps?.headCell,
    theme,
  ]);

  const $ResizeBar = useMemo(
    () => (resizable ? <ColumnResizeBar data-column-id={id} /> : null),
    [resizable, id]
  );

  const $SortButton = useMemo(
    () => (sortable ? <SortButton columnId={id} /> : null),
    [sortable, id]
  );

  return !visible ? (
    <></>
  ) : (
    <SortableItemContext.Provider value={dndContextValue}>
      <Cell key={id || field} {...cellProps} ref={setNodeRef}>
        <CellContent
          {...slotProps?.headCellContent}
          className={`head-content ${slotProps?.headCellContent?.className || ""}`}
        >
          <DragHandle />
          <CellContentLabel {...slotProps?.headCellLabel}>
            {head || null}
          </CellContentLabel>
          {$SortButton}
          {$ResizeBar}
        </CellContent>
      </Cell>
    </SortableItemContext.Provider>
  );
}

const currentErrorLog = console.error;
console.error = function (...args) {
  const e = {
    0: "In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s",
    1: "<div>",
    2: "thead",
  };

  if (args?.[0] === e[0] && args?.[1] === e[1] && args?.[2] === e[2]) {
    return;
  }
  return currentErrorLog(...args);
};

function FixedHeaderContent() {
  const Slot = useGetState((s) => s?.slots?.headRow);
  const Component = Slot || S.HeadRow;

  const [active, setActive] = useState<Active | null>(null);
  const colDefs = useGetState((s) => s?.columns);

  const activeHeader = useMemo(
    () => colDefs?.find?.((item) => item.id === active?.id),
    [active, colDefs]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragCancel = useCallback((_: DragCancelEvent) => {
    setActive(null);
  }, []);

  const setState = useSetState();

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setState({ scrollBlocked: true });
    setActive(active);
  }, []);

  const onColumnsReOrder = useGetState((s) => s?.onColumnsReOrder);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!colDefs?.length) return;
      if (over && active.id !== over?.id) {
        const activeIndex = colDefs.findIndex(({ id }) => id === active.id);
        const overIndex = colDefs.findIndex(({ id }) => id === over.id);
        const newColDefs = arrayMove(colDefs, activeIndex, overIndex);
        setState({ columns: newColDefs });
        setTimeout(() => {
          onColumnsReOrder?.(newColDefs as any);
        }, 0);
      }
      setActive(null);
      setState({ scrollBlocked: false });
    },
    [colDefs, onColumnsReOrder]
  );

  const slotProps = useGetState((s) => s?.slotProps?.headRow);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay dropAnimation={dropAnimationConfig} wrapperElement="tr">
        {!activeHeader ? null : <RenderCell {...activeHeader} isOverlay />}
      </DragOverlay>
      <Component {...slotProps}>
        <SortableContext items={(colDefs || []) as any}>
          {!colDefs?.length
            ? null
            : colDefs.map((col) => (
                <RenderCell {...col} key={col?.id || col?.field} />
              ))}
        </SortableContext>
      </Component>
    </DndContext>
  );
}

export const createHeaderComponent = () => () => <FixedHeaderContent />;
