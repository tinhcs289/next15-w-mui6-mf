import type { BoxProps } from "@mui/material/Box";
import type { TooltipProps } from "@mui/material/Tooltip";
import type { ComponentType, Ref } from "react";

export type BoxTooltipProps = Omit<BoxProps, "title"> & {
  innerRef?: Ref<unknown>;
  TooltipComponent?: typeof DefaultTooltip | ComponentType<any>;
  title?: TooltipProps["title"];
  tooltipProps?: Partial<TooltipProps>;
};
