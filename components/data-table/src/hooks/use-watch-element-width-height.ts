"use client"

import debounce from "lodash/debounce";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  // @ts-ignore
  outer.style.msOverflowStyle = "scrollbar"; 
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  // @ts-ignore
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

export function useWatchElementWidthHeight<El extends HTMLElement = HTMLElement>(params?: Readonly<{
  excludeVerticalScrollbar?: boolean;
  excludeHorizontalScrollbar?: boolean;
}>): [elementRef: RefObject<El>, widthInPx: number, heightInPx: number] {
  const {
    excludeVerticalScrollbar = false,
    excludeHorizontalScrollbar = false,
   } = params || {};

  const ref = useRef<El>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!(ref?.current instanceof Element)) return;
    const scrollbarWidth = getScrollbarWidth();
    const verticalScrollbarWidth = !excludeVerticalScrollbar
      ? 0
      : scrollbarWidth;
    const horizontalScrollbarWidth = !excludeHorizontalScrollbar
      ? 0
      : scrollbarWidth;
    setHeight(ref.current.offsetHeight - horizontalScrollbarWidth);
    setWidth(ref.current.offsetWidth - verticalScrollbarWidth);

    const updateWidthHight = debounce(() => {
      setHeight((ref?.current?.offsetHeight || 0) - horizontalScrollbarWidth);
      setWidth((ref?.current?.offsetWidth || 0) - verticalScrollbarWidth);
    }, 300);

    const resizeObserver = new ResizeObserver(() => {
      updateWidthHight();
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  // @ts-ignore;
  return [ref, width, height];
}