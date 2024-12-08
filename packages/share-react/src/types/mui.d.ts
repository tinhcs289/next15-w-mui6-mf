import type { FunctionInterpolation } from "@emotion/react";
import type { SvgIconTypeMap, Theme, SxProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ClassAttributes, ComponentType, HTMLAttributes } from "react";

export type MuiBreakPoint = "xs" | "sm" | "md" | "lg" | "xl";
type Icon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
type SvgImage = ComponentType<
  SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>
>;
export type MuiIcon = Icon | SvgImage | ComponentType<any>;
export type MuiIconProps = SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>;
export type HtmlElementProps = ClassAttributes<HTMLSpanElement> &
  HTMLAttributes<HTMLSpanElement>;

export type StyleMakerFn = FunctionInterpolation<Theme>;

export type MuiSx = SxProps<Theme>;
