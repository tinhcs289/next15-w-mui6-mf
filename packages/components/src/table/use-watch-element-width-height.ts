"use client"

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export function useWatchElementWidthHeight<El extends HTMLElement = HTMLElement>(): [
  elementRef: RefObject<El>,
  widthInPx: number,
  heightInPx: number,
] {
  const ref = useRef<El>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!ref?.current) return;
    setHeight(ref.current.clientHeight);
    setWidth(ref.current.clientWidth);

    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref?.current?.clientHeight || 0);
      setWidth(ref?.current?.clientWidth || 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  // @ts-ignore;
  return [ref, width, height];
}