"use client";

import { styled } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import type { ComponentType } from "react";
import { forwardRef } from "react";
import type { SlotProps } from "../types";

const StyledDialogActions = styled(
  forwardRef<HTMLDivElement, SlotProps["actions"]>(
    ({ children, contentProps, ...otherProps }, ref) => {
      return (
        <DialogActions {...otherProps} ref={ref}>
          <Grid container width="100%" {...contentProps}>
            {children}
          </Grid>
        </DialogActions>
      );
    }
  )
)<SlotProps["actions"]>(({ theme }) => ({
  padding: theme.spacing(5),
  paddingTop: theme.spacing(2),
})) as ComponentType<SlotProps["actions"]>;
StyledDialogActions.displayName = "StyledDialogActions";

export default StyledDialogActions;
