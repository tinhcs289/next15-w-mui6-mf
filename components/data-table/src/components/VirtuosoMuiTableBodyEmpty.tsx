"use client";

import type { JSX } from "react";
import { forwardRef, useMemo } from "react";
import S from "./Slots";
import { useGetState } from "../context";
import type { Any, SlotProps } from "../types";

const VirtuosoMuiTableBodyEmpty = forwardRef<
  HTMLTableSectionElement,
  SlotProps<Any>["body"]
>(({ children, ...props }, ref) => {
  const Slot = useGetState((s) => s?.slots?.body);
  const Component = Slot || S.Body;

  const colSpan = useGetState((s) => s?.columns?.length);
  const bodyProps = useGetState((s) => s?.slotProps?.body);
  const emptyDisplay = useGetState((s) => s?.emptyDisplay);
  const loading = useGetState((s) => !!s?.loading);

  const $display = useMemo(
    () => (!loading ? emptyDisplay : ""),
    [loading, emptyDisplay]
  );

  return (
    <Component {...props} {...bodyProps} ref={ref as any}>
      <S.BodyRow>
        <S.BodyCell align="center" colSpan={colSpan}>
          <S.BodyCellContent
            sx={{
              margin: "0 auto",
              width: "100%",
              height: "100%",
              padding: "4rem",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {$display || children}
          </S.BodyCellContent>
        </S.BodyCell>
      </S.BodyRow>
    </Component>
  );
}) as <RowData extends Any = Any>(
  props: SlotProps<RowData>["body"]
) => JSX.Element;
// @ts-ignore
VirtuosoMuiTableBodyEmpty.displayName = "VirtuosoMuiTableBodyEmpty";

export default VirtuosoMuiTableBodyEmpty;
