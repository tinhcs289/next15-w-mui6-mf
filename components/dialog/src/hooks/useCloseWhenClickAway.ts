"use client";

import type { DialogProps } from "@mui/material/Dialog";
import { useCallback, useMemo } from "react";
import { useGetStateDialog } from "../context";

export default function useCloseWhenClickAway(propValue: boolean = true) {
  const closeDialog = useGetStateDialog((s) => s?.closeDialog);

  const handleClose = useCallback(() => {
    closeDialog?.({ reason: "click_outside" });
  }, [closeDialog]);

  const dialogProps: Partial<DialogProps> = useMemo(() => {
    if (!propValue) return {};
    return {
      onClose: handleClose,
    };
  }, [propValue]);

  return dialogProps;
}