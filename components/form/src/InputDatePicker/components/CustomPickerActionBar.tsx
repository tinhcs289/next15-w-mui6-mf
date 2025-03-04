"use client";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useMemo } from "react";
import type { CustomPickerActionBarProps } from "../types";

export default function CustomPickerActionBar({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actions,
  onAccept,
  onClear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCancel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetToday,
  sx,
  buttonOk,
  buttonClear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buttonNegative,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closeOnSelect,
  ...props
}: CustomPickerActionBarProps) {
  const $ButtonClear = useMemo(() => {
    if (!buttonClear) return null;
    return (
      <Button color="error" onClick={onClear} sx={{ textTransform: "none" }}>
        {buttonClear}
      </Button>
    );
  }, [buttonClear, onClear]);

  const $ButtonOk = useMemo(() => {
    if (!buttonOk || !!closeOnSelect) return null;
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={onAccept}
        sx={{ textTransform: "none" }}
      >
        {buttonOk}
      </Button>
    );
  }, [buttonOk, closeOnSelect, onAccept]);

  // const __ButtonNegative = useMemo(() => {
  //   if (!buttonNegative) return null;
  //   return (
  //     <Button onClick={onCancel} sx={{ textTransform: "none" }}>
  //       {buttonNegative}
  //     </Button>
  //   );
  // }, [buttonNegative, onCancel]);

  return (
    <DialogActions
      sx={{ display: "flex", justifyContent: "space-between", ...sx }}
      {...props}
    >
      {$ButtonClear}
      {$ButtonOk}
      {/* {$ButtonNegative}  */}
    </DialogActions>
  );
}