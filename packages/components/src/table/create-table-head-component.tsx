"use client";

import type { Active, DragCancelEvent, DragEndEvent, DraggableSyntheticListeners, DragStartEvent, DropAnimation } from "@dnd-kit/core";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { alpha, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Slot, SlotProps } from "./base.components";
import S from "./base.components";
import { Any, ColumnDef, TableProps } from "./base.types";
import { useGetState, useSetState } from "./context";

const SortableItemContext = createContext<{
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}>({
  attributes: {},
  listeners: undefined,
  ref() {}
});

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};

export function useHeaderDraggable() {
  const { attributes, listeners, ref: handleRef } = useContext(SortableItemContext);
  const enable = useGetState(s => !!s?.columnsReOrder);

  const handleProps = useMemo(() => ({
    ...attributes,
    ...listeners,
  }), [attributes, listeners]);

  return {
    enable,
    handleRef,
    handleProps
  }
}

function DragHandle() {
  const { enable, handleProps, handleRef } = useHeaderDraggable();

  return !enable ? null : (
    <IconButton {...handleProps} ref={handleRef} size="small">
      <DragIndicatorIcon />
    </IconButton>
  );
}

function RenderCell<RowData extends Any = Any>({
  isOverlay = false,
  id,
  field,
  head,
  slots,
  slotProps,
}: ColumnDef<RowData> & { isOverlay?: boolean }) {
  const colspan = useGetState(s => s?.colDefs?.length);
  const tableWidth = useGetState(s => s?.tableWidth);
  const avgWidth = useMemo(() => (tableWidth || 0) / (colspan || 1), [tableWidth, colspan])

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id: id as string });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const theme = useTheme();

  const inner = head || null;
  const Cell = slots?.headCell || S.HeadCell;

  const cellProps: Partial<SlotProps['headCell']> = useMemo(() => {
    const props = { ...slotProps?.headCell };
    props["style"] = {
      ...props["style"],
      width: isOverlay ? `${avgWidth}px` : props?.["style"]?.["width"],
      opacity: isOverlay ? 1 : isDragging ? 0.4 : undefined,
      background: isOverlay
        ? alpha(theme.palette.primary.main, 0.02)
        : theme.palette.background.paper,
      boxShadow: isOverlay ? theme.shadows[4] : undefined,
      border: isOverlay
        ? `1px solid ${theme.palette.primary.main}`
        : isDragging
          ? `1px dashed ${theme.palette.primary.main}`
          : undefined,
      transform: CSS.Translate.toString(transform),
      transition,
    };
    return props;
  }, [slotProps?.headCell, avgWidth, isOverlay, transform, isDragging], );

  return (
    <SortableItemContext.Provider value={context}>
      <Cell key={id || field} {...cellProps} ref={setNodeRef}>
        <DragHandle />
        {inner}
      </Cell>
    </SortableItemContext.Provider>
  );
}


function HeaderContent<RowData extends Any = Any>({
  component: Component = S.HeadRow,
  props,
  onColumnsReOrder,
}: {
  component?: Slot["HeadRow"];
  props?: Partial<SlotProps["headRow"]>;
  onColumnsReOrder?: TableProps<RowData>["onColumnsReOrder"];
}) {
  const setState = useSetState();
  const colDefs = useGetState((s) => s?.colDefs);

  const [active, setActive] = useState<Active | null>(null);

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

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setState({ scrollBlocked: true });
    setActive(active);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!colDefs?.length) return;

      if (over && active.id !== over?.id) {
        const activeIndex = colDefs.findIndex(({ id }) => id === active.id);
        const overIndex = colDefs.findIndex(({ id }) => id === over.id);

        const newColDefs = arrayMove(colDefs, activeIndex, overIndex);

        setState({ colDefs: newColDefs });
        setTimeout(() => {
          onColumnsReOrder?.(newColDefs as any);
        }, 0);
      }

      setActive(null);
      setState({ scrollBlocked: false });
    },
    [colDefs]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {!activeHeader ? null : <RenderCell {...activeHeader} isOverlay />}
      </DragOverlay>
      <Component {...props}>
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

export function createTableHeadComponent<RowData extends Any = Any>({
  component,
  props,
  onColumnsReOrder,
}: {
  component?: Slot["HeadRow"];
  props?: Partial<SlotProps["headRow"]>;
  onColumnsReOrder?: TableProps<RowData>["onColumnsReOrder"];
}) {
  return () => {
    return <HeaderContent component={component} props={props} onColumnsReOrder={onColumnsReOrder} />;
  };
}
