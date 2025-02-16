import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { TooltipProps } from "@mui/material/Tooltip";
import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import { HtmlTooltipStyled } from "./components-styled";

const BoxTooltipContent = forwardRef(({ children, ...others }: BoxProps, ref?: any) => {
  return (
    <Box {...others} ref={ref}>
      {children}
    </Box>
  );
});
BoxTooltipContent.displayName = "BoxTooltipContent";

export type BoxTooltipProps = Omit<BoxProps, "title"> & {
  innerRef?: Ref<unknown>;
  TooltipComponent?: typeof HtmlTooltipStyled | ComponentType<any>;
  title?: TooltipProps["title"];
  tooltipProps?: Partial<TooltipProps>;
};

export function BoxTooltip({
  children,
  tooltipProps,
  title,
  TooltipComponent = HtmlTooltipStyled,
  ...others
}: BoxTooltipProps) {
  return (
    <TooltipComponent
      {...tooltipProps}
      title={title || tooltipProps?.title || ""}
    >
      <BoxTooltipContent {...others}>{children}</BoxTooltipContent>
    </TooltipComponent>
  );
}
