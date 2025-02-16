"use client";

import { useFormContext as useRHFContext } from "react-hook-form";
import type { Any, UseFormContextReturns } from "./types";

export function useFormContext<Values extends Any = Any>() {
  return useRHFContext() as unknown as UseFormContextReturns<Values>;
}
