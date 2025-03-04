import ErrorIcon from "@mui/icons-material/Error";
import { forwardRef } from "react";
import BoxStyled from "./components/BoxStyled";
import TypographyStyled from "./components/TypographyStyled";
import type { InputErrorProps } from "./types";

export const InputError = forwardRef<HTMLDivElement, InputErrorProps>(
  ({ children, slotProps, slot = {}, ...otherProps }, ref) => {
    const {
      root: Root = BoxStyled,
      icon: Icon = ErrorIcon,
      text: Text = TypographyStyled,
    } = slot;
    return (
      <Root {...otherProps} ref={ref}>
        <Icon color="error" fontSize="small" {...slotProps?.icon} />
        <Text {...slotProps?.text as any}>{children}</Text>
      </Root>
    );
  }
);
InputError.displayName = "InputError";
