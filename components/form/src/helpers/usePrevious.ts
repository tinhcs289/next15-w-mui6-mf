"use client";

import { useEffect, useRef } from "react";

export default function usePrevious<T>(value?: T | null): T | null | undefined {
  const ref = useRef<T | null | undefined>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
