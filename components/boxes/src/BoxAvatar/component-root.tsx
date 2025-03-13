import Avatar from "@mui/material/Avatar";
import { ComponentType, forwardRef } from "react";
import type { BoxAvatarProps } from "./types";

export const BoxAvatar = forwardRef<HTMLDivElement, BoxAvatarProps>(
  ({ children, Icon, iconProps, ...otherProps }, ref) => {
    if (!!Icon)
      return (
        <Avatar {...otherProps} ref={ref}>
          <Icon {...iconProps} />
        </Avatar>
      );

    return (
      <Avatar {...otherProps} ref={ref}>
        {children}
      </Avatar>
    );
  }
) as ComponentType<BoxAvatarProps>;
BoxAvatar.displayName = "BoxAvatar";
