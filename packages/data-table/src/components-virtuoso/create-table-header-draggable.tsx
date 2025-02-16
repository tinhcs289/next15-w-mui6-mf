"use client";

import type { DraggableSyntheticListeners, DropAnimation } from "@dnd-kit/core";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { createContext, useContext, useMemo } from "react";
import ButtonGrabToReOrderColumn from "../components/ButtonGrabToReOrderColumn";
import { useGetState } from "../context";

export const SortableItemContext = createContext<{
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

export function useHeaderDraggable() {
  const {
    attributes,
    listeners,
    ref: handleRef,
  } = useContext(SortableItemContext);
  const enable = useGetState((s) => !!s?.columnsReOrder);

  const handleProps = useMemo(
    () => ({
      ...attributes,
      ...listeners,
    }),
    [attributes, listeners]
  );

  return { enable, handleProps, handleRef };
}

export function DragHandle() {
  const { enable, handleProps, handleRef } = useHeaderDraggable();
  return !enable ? null : (
    <ButtonGrabToReOrderColumn {...handleProps} component="button" ref={handleRef}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </ButtonGrabToReOrderColumn>
  );
}

export function useDndColumns(columnid?: string) {
  const {
    attributes,
    isDragging,
    isOver,
    isSorting,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: columnid as string });

  const dndContextValue = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  return {
    dndContextValue,
    isDragging,
    isOver,
    isSorting,
    transform,
    transition,
    setNodeRef,
    setActivatorNodeRef,
  };
}
