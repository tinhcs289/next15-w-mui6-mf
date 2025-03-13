"use client";

import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import { createContext } from "react";

export const SortableItemContext = createContext<{
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}>({
  attributes: {},
  listeners: undefined,
  ref() {},
});