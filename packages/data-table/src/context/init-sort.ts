"use client";

import type { JSX } from "react";
import { memo, useEffect, useRef } from "react";
import type { Any, DataTableProps } from "../types";
import { useGetState } from "./context";

export const OnSortInitializer = memo(
  ({ callback }: { callback?: DataTableProps["onSort"] }) => {
    const sortOptions = useGetState((s) => s.sortOptions);
    const isStateChangesByInit = useRef(true);

    useEffect(() => {
      if (typeof callback !== "function") return;
      if (isStateChangesByInit.current) {
        isStateChangesByInit.current = false;
        return;
      }

      setTimeout(() => {
        callback(sortOptions || []);
      }, 0);
    }, [sortOptions, callback]);

    return null as unknown as JSX.Element;
  }
) as <RowData extends Any = Any>({
  callback,
}: {
  callback?: DataTableProps<RowData>["onSort"];
}) => JSX.Element;
// @ts-ignore
OnSortInitializer.displayName = "OnSortInitializer";