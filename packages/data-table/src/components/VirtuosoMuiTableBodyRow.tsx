"use client";

import get from "lodash/get";
import { forwardRef, useMemo } from "react";
import S from "./Slots";
import { useGetState } from "../context";
import type { Any, VirtuosoComponents } from "../types";

const VirtuosoMuiTableBodyRow: Required<
  VirtuosoComponents<Any, Any>
>["TableRow"] = forwardRef(({ children, item, ...props }, ref) => {
  const data = item;
  const rowIndex = +props["data-index"];
  const idField = useGetState((s) => s?.rowIdentity);
  const $key = useMemo(
    () => (!idField ? rowIndex : get(data, idField, rowIndex)),
    [idField, rowIndex]
  );

  const rowProps = useGetState((s) => s?.slotProps?.bodyRow);
  const Slot = useGetState((s) => s?.slots?.bodyRow);
  const rowCompositions = useGetState((s) => s?.rowCompositions);
  let Component = Slot || S.BodyRow;
  const isNativeRow = !Slot;
  if (!!rowCompositions?.length) {
    // @ts-ignore
    Component = combineHOCs(...rowCompositions)(Component);
  }

  let customProps = {};
  if (typeof rowProps === "object") customProps = rowProps;
  if (typeof rowProps === "function")
    customProps = rowProps({ row: data, rowIndex });

  if (!isNativeRow) {
    // @ts-ignore
    customProps["row"] = data;
    // @ts-ignore
    customProps["rowIndex"] = rowIndex;
  }

  return (
    // @ts-ignore
    <Component
      key={$key}
      {...props}
      {...customProps}
      // @ts-ignore
      sx={{ ...props?.sx, ...customProps?.sx }}
      ref={ref as any}
    >
      {children}
    </Component>
  );
});

VirtuosoMuiTableBodyRow.displayName = "VirtuosoMuiTableBodyRow";

export default VirtuosoMuiTableBodyRow;
