import type { AvatarProps } from "@mui/material/Avatar";
import type { MuiIcon, MuiIconProps } from "@shared/types-react/mui";

export type BoxAvatarProps = AvatarProps & {
  Icon?: MuiIcon;
  iconProps?: MuiIconProps;
};
