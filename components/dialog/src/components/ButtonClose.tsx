"use client";

import CloseIcon from "@mui/icons-material/Close";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import type { ComponentType, MouseEventHandler } from "react";
import { forwardRef, useCallback } from "react";
import { useGetStateDialog } from "../context";

const ButtonClose = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, onClick, ...otherProps }, ref) => {
    const closeDialog = useGetStateDialog((s) => s?.closeDialog);
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        closeDialog?.({ reason: "force_close" });
        onClick?.(e);
      },
      [closeDialog, onClick]
    );

    return (
      <IconButton {...otherProps} onClick={handleClick} ref={ref}>
        {children || <CloseIcon color="primary" />}
      </IconButton>
    );
  }
) as ComponentType<IconButtonProps>;
ButtonClose.displayName = "ButtonClose";

export default ButtonClose;
