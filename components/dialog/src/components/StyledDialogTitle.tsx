"use client";

import { styled } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import type { ComponentType, } from "react";
import { forwardRef } from "react";
import type { SlotProps } from "../types";

const StyledDialogTitle = styled(
  forwardRef<HTMLDivElement, SlotProps["title"]>(
    ({ children, ...props }, ref) => {
      return (
        <DialogTitle {...props} ref={ref} component="div">
          {children}
        </DialogTitle>
      );
    }
  )
)<SlotProps["title"]>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(5),
  paddingBottom: theme.spacing(2),
})) as ComponentType<SlotProps["title"]>;
StyledDialogTitle.displayName = "StyledDialogTitle";

export default StyledDialogTitle;
