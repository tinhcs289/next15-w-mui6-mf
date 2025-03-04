"use client";

import { createContext, useContext } from "react";
import type { PanelResizableContextValues } from "./types";


export const PanelResizableContext = createContext<PanelResizableContextValues>(
  null as unknown as PanelResizableContextValues
);

export function usePanelResizableContext() {
  return useContext(PanelResizableContext);
}
