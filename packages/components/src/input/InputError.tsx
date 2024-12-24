"use client";

import ErrorIcon from "@mui/icons-material/Error";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import { ComponentType } from "react";
import { MuiIcon, MuiIconProps } from "@repo/types-react/mui";

const TypographyError = styled(Typography)<TypographyProps>(({ theme }) => ({
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
}));

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  transition: "all ease 0.3",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0.5),
}));

export type InputErrorProps = Omit<BoxProps, "slot"> & {
  slot?: {
    Root?: typeof BoxStyled | ComponentType<any>;
    Icon?: MuiIcon | ComponentType<any>;
    Text?: typeof TypographyError | ComponentType<any>;
  };
  slotProps?: {
    icon?: Partial<MuiIconProps>;
    text?: Partial<TypographyProps>;
  };
};

export default function InputError({
  children,
  slotProps,
  slot = {},
  ...otherProps
}: InputErrorProps) {
  const { Root = BoxStyled, Icon = ErrorIcon, Text = TypographyError } = slot;
  return (
    <Root {...otherProps}>
      <Icon color="error" fontSize="small" {...slotProps?.icon} />
      <Text {...slotProps?.text}>{children}</Text>
    </Root>
  );
}
