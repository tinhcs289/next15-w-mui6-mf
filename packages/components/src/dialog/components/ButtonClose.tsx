"use client";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import type { MouseEventHandler } from "react";
import { useCallback } from "react";
import { useGetStateDialog } from "../context";

export default function ButtonClose() {
  const onClose = useGetStateDialog((s) => s?.onClose);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      onClose?.({ reason: "force_close" });
    },
    [onClose]
  );
  return (
    <IconButton onClick={handleClick}>
      <CloseIcon color="primary" />
    </IconButton>
  );
}
