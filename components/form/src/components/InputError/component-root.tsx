"use client";

import ErrorIcon from "@mui/icons-material/Error";
import type { SvgIconTypeMap } from "@mui/material";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import type { TextProps } from "@shared/typo/Text";
import type { ComponentType } from "react";
import { forwardRef } from "react";

const TypographyStyled = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    position: "absolute",
    color: theme.palette.error.contrastText,
    background: theme.palette.error.main,
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    zIndex: 1,
    top: theme.spacing(3),
    right: "-50%",
    fontSize: theme.spacing(1.2),
    boxShadow: theme.shadows[6],
    "::before": {
      position: "absolute",
      content: '""',
      display: "block",
      right: theme.spacing(2),
      top: theme.spacing(-0.5),
      width: 0,
      height: 0,
      borderLeft: `${theme.spacing(0.5)}px solid transparent`,
      borderRight: `${theme.spacing(0.5)}px solid transparent`,
      borderBottom: `${theme.spacing(0.5)}px solid ${theme.palette.error.main}`,
    },
    whiteSpace: "nowrap",
    userSelect: "none",
    opacity: 0.75,
  })
) as ComponentType<TypographyProps>;
TypographyStyled.displayName = "TypographyStyled";

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  transition: "all ease 0.3",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0.5),
}));
BoxStyled.displayName = "BoxStyled";

type Icon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
type SvgImage = ComponentType<
  SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>
>;
type MuiIcon = Icon | SvgImage | ComponentType<any>;
type MuiIconProps = SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>;


export type InputErrorSlot = {
  root: ComponentType<BoxProps>;
  icon: MuiIcon;
  text: ComponentType<TypographyProps> | ComponentType<TextProps>;
};

export type InputErrorSlotProps = {
  icon: Partial<MuiIconProps>;
  text: Partial<TypographyProps> | Partial<TextProps>;
};

export type InputErrorProps = Omit<BoxProps, "slot"> & {
  slot?: {
    root?: InputErrorSlot["root"];
    icon?: InputErrorSlot["icon"];
    text?: InputErrorSlot["text"];
  };
  slotProps?: {
    icon?: InputErrorSlotProps["icon"];
    text?: InputErrorSlotProps["text"];
  };
};

const InputError = forwardRef<HTMLDivElement, InputErrorProps>(
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

export default InputError;
