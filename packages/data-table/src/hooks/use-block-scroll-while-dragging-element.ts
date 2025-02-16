"use client";

import type { UIEventHandler } from "react";
import { useCallback } from "react";
import { useGetState, useSetState } from "../context";

export function useBlockScrollingWhileDraggingElement() {
  const setState = useSetState();

  const scrollBlocked = useGetState((s) => !!s?.scrollBlocked);
  const scrollTop = useGetState((s) => s?.scrollTop);

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!e?.target) return;
      const newScrollPosition = (e.target as HTMLDivElement).scrollTop;
      if (!scrollBlocked) {
        setState({ scrollTop: newScrollPosition });
      } else {
        (e.target as HTMLDivElement).scrollTo({
          top: scrollTop || 0,
          left: 0,
        });
      }
    },
    [scrollTop, scrollBlocked]
  );

  return { handleScroll };
}