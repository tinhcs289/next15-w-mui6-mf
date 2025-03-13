"use client";

import { useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";

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
