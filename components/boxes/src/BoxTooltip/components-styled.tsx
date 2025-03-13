"use client";

import { alpha, styled } from "@mui/material";
import type { TooltipProps } from "@mui/material/Tooltip";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { ComponentType } from "react";

export const HtmlTooltipStyled = styled(
  ({ className, ...props }: TooltipProps) => {
    return <Tooltip {...props} classes={{ popper: className }} />;
  }
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: theme.spacing(1),
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
    color: theme.palette.common.white,
    width: "max-content",
    minWidth: "fit-content",
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
  },
})) as ComponentType<TooltipProps>;
HtmlTooltipStyled.displayName = "HtmlTooltipStyled";
