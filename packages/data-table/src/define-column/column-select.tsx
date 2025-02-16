import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import type { ChangeEvent } from "react";
import { useCallback, useMemo } from "react";
import S from "../components";
import { DragHandle } from "../components-virtuoso/create-table-header-draggable";
import { useGetState } from "../context";
import type { CustomSlot, Slot } from "../types";
import { defineBaseColumn } from "./column-base";

const SelectAll: Slot["headCellContent"] = (props) => {
  const checkAllItems = useGetState((s) => s?.checkAllItems);
  const checked = useGetState((s) => !!s?.isSelectedAll);
  const disabled = useGetState((s) => !!s?.loading || !s?.rows?.length);

  const handleSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checkedValue: boolean) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      checkAllItems?.(checkedValue);
    },
    [checkAllItems]
  );

  return (
    <S.HeadCellContent {...props}>
      <DragHandle />
      <Checkbox checked={checked} onChange={handleSelect} disabled={disabled} />
    </S.HeadCellContent>
  );
};

const SelectCell: CustomSlot["bodyCellContent"] = ({
  row,
  rowIndex,
  ...props
}) => {
  const checkOrUnCheckItem = useGetState((s) => s?.checkOrUnCheckItem);
  const isSelected = useGetState((s) => s?.isSelected);
  const checked = useMemo(
    () => (!row ? false : !!isSelected?.(row)),
    [isSelected, row]
  );
  const disabled = useGetState((s) => !!s?.loading);

  const handleSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>, _: boolean) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      if (!row) return;
      checkOrUnCheckItem?.(row);
    },
    [row, checkOrUnCheckItem]
  );

  return (
    <S.BodyCellContent {...props}>
      <Box sx={{ width: (theme) => theme.spacing(1.5) }} />
      <Checkbox
        checked={checked}
        onChange={handleSelect}
        disabled={disabled}
        size="small"
      />
    </S.BodyCellContent>
  );
};

export const defineSelectColumn = () => {
  return defineBaseColumn({
    field: "@select",
    head: "",
    width: 50,
    slot: {
      headCellContent: SelectAll,
      bodyCellContent: SelectCell,
    },
    slotProps: {
      headCellContent: {
        sx: { justifyContent: "flex-start" },
      },
      headCellLabel: {
        sx: { textAlign: "center" },
      },
      bodyCellContent: {
        sx: {
          justifyContent: "center",
        },
      },
    },
  });
};
