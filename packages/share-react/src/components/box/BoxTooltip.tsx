"use client";

import { alpha, styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { TooltipProps } from "@mui/material/Tooltip";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";

const DefaultTooltip = styled(function HtmlTooltipStyled({
  className,
  ...props
}: TooltipProps) {
  return <Tooltip {...props} classes={{ popper: className }} />;
})(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: theme.spacing(1),
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
    color: theme.palette.common.white,
    width: "max-content",
    minWidth: "fit-content",
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const BoxWrap = forwardRef(function BoxForwardRef(
  { children, ...others }: BoxProps,
  ref?: any
) {
  return (
    <Box {...others} ref={ref}>
      {children}
    </Box>
  );
});

export type BoxTooltipProps = Omit<BoxProps, "title"> & {
  innerRef?: Ref<unknown>;
  TooltipComponent?: typeof DefaultTooltip | ComponentType<any>;
  title?: TooltipProps["title"];
  tooltipProps?: Partial<TooltipProps>;
};

export default function BoxTooltip({
  children,
  tooltipProps,
  title,
  TooltipComponent = DefaultTooltip,
  ...others
}: BoxTooltipProps) {
  return (
    <TooltipComponent
      {...tooltipProps}
      title={title || tooltipProps?.title || ""}
    >
      <BoxWrap {...others}>{children}</BoxWrap>
    </TooltipComponent>
  );
}
