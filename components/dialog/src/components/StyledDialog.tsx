"use client";

import { styled } from "@mui/material";
import type { DialogProps } from "@mui/material/Dialog";
import Dialog, { dialogClasses } from "@mui/material/Dialog";
import type { ComponentType } from "react";
import { forwardRef, useMemo } from "react";
import { useGetStateDialog } from "../context";
import useAutoFullWidthOnSmallScreen from "../hooks/useAutoFullWidthOnSmallScreen";
import useCloseWhenClickAway from "../hooks/useCloseWhenClickAway";
import type { SlotProps } from "../types";
import LoadingOverlay from "./LoadingOverlay";
import SlideComponent from "./SlideComponent";

const StyledDialog = styled(
  forwardRef<HTMLElement, SlotProps["dialog"]>(
    (
      {
        children,
        component,
        onSubmit,
        slide = "down",
        closeWhenClickAway = true,
        ...props
      },
      ref
    ) => {
      const fullScreen = useAutoFullWidthOnSmallScreen(props?.fullScreen);
      const clickawayProps = useCloseWhenClickAway(closeWhenClickAway);

      const formProps = useMemo(() => {
        if (component !== "form") return { component };
        return {
          component,
          noValidate: true,
          autoComplete: "off",
          onSubmit,
        } as unknown as Partial<DialogProps>;
      }, [component, onSubmit]);

      const open = useGetStateDialog(s => !!s?.open);

      return (
        <Dialog
          keepMounted={false}
          scroll="paper"
          {...props}
          slots={{
            ...props.slots,
            transition: SlideComponent[slide],
          }}
          {...formProps}
          {...clickawayProps}
          fullScreen={fullScreen}
          ref={ref as any}
          open={open}
        >
          <LoadingOverlay />
          {children}
        </Dialog>
      );
    }
  )
)<SlotProps["dialog"]>(({ theme }) => ({
  [`&.${dialogClasses.root}`]: {
    [`& > .${dialogClasses.container}`]: {
      [`& > .${dialogClasses.paper}`]: {
        [`&:not(.${dialogClasses.paperFullScreen})`]: {
          borderRadius: theme.spacing(1.5),
        },
        minWidth: theme.spacing(30),
        position: "relative",
        backgroundRepeat: "none",
        backgroundPosition: "center",
      },
    },
  },
})) as ComponentType<SlotProps["dialog"]>;
StyledDialog.displayName = "StyledDialog";

export default StyledDialog;
