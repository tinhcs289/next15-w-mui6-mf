"use client";

import { styled } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import type { ComponentType } from "react";
import { forwardRef } from "react";
import type { SlotProps } from "../types";

const StyledDialogContent = styled(
  forwardRef<HTMLDivElement, SlotProps["content"]>(
    ({ children, contentProps, ...props }, ref) => {
      return (
        <DialogContent {...props} ref={ref}>
          <Grid container width="100%" {...contentProps}>
            {children}
          </Grid>
        </DialogContent>
      );
    }
  )
)<SlotProps["content"]>(({ theme }) => ({
  padding: theme.spacing(5),
})) as ComponentType<SlotProps["content"]>;
StyledDialogContent.displayName = "StyledDialogContent";

export default StyledDialogContent;
