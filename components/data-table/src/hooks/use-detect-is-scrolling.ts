"use client";

import { useCallback } from "react";
import { useSetState } from "../context";

export function useDetectIsScrolling() {
  const setState = useSetState();

  const detectIsScrolling = useCallback(
    (state: boolean) => {
      setState({ isScrolling: state });
    },
    [setState]
  );

  return { detectIsScrolling };
}