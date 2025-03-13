import type { SvgIconTypeMap } from "@mui/material";
import type { AvatarProps } from "@mui/material/Avatar";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";

type Icon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
type SvgImage = ComponentType<
  SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>
>;
type MuiIcon = Icon | SvgImage | ComponentType<any>;
type MuiIconProps = SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>;

export type BoxAvatarProps = AvatarProps & {
  Icon?: MuiIcon;
  iconProps?: MuiIconProps;
};
