"use client"

import debounce from "lodash/debounce";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  // @ts-ignore
  outer.style.msOverflowStyle = 'scrollbar'; 
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  // @ts-ignore
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

type Dimension = {
  visible: number;
  full: number;
};


export type UseWatchElementDimensionsReturns<
  El extends HTMLElement = HTMLElement,
> = [elementRef: RefObject<El>, widthInPx: Dimension, heightInPx: Dimension];

export function useWatchElementDimensions<Elm extends HTMLElement = HTMLElement>(
  params?: Readonly<{
    excludeVerticalScrollbar?: boolean;
    excludeHorizontalScrollbar?: boolean;
    observerDebounce?: number;
  }>
): UseWatchElementDimensionsReturns<Elm> {
  const {
    excludeVerticalScrollbar = false,
    excludeHorizontalScrollbar = false,
    observerDebounce = 0,
  } = params || {};

  const ref = useRef<Elm>(null as unknown as Elm);
  const [height, setHeight] = useState<Dimension>({ full: 0, visible: 0 });
  const [width, setWidth] = useState<Dimension>({ full: 0, visible: 0 });

  useEffect(() => {
    if (!(ref?.current instanceof Element)) return;
    const scrollbarWidth = getScrollbarWidth();
    const verticalScrollbarWidth = !excludeVerticalScrollbar
      ? 0
      : scrollbarWidth;
    const horizontalScrollbarWidth = !excludeHorizontalScrollbar
      ? 0
      : scrollbarWidth;

    setHeight({
      full: ref.current.scrollHeight,
      visible: ref.current.offsetHeight - horizontalScrollbarWidth,
    });

    setWidth({
      full: ref.current.scrollWidth,
      visible: ref.current.clientWidth - verticalScrollbarWidth,
    });

    const callback = debounce<ResizeObserverCallback>(() => {
      if (!ref?.current) return;
      setHeight({
        full: ref.current.scrollHeight,
        visible: ref.current.offsetHeight - horizontalScrollbarWidth,
      });
      setWidth({
        full: ref.current.scrollWidth,
        visible: ref.current.clientWidth - verticalScrollbarWidth,
      });
    }, observerDebounce);

    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [observerDebounce]);

  return [ref, width, height];
}