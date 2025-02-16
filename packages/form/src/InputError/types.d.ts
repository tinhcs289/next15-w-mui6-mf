import type { BoxProps } from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import type { MuiIcon, MuiIconProps } from "@shared/types-react/mui";
import type { TextProps } from "@shared/typo/Text";
import type { ComponentType } from "react";

export type Slot = {
  root: ComponentType<BoxProps>;
  icon: MuiIcon;
  text: ComponentType<TypographyProps> | ComponentType<TextProps>;
};

export type SlotProps = {
  icon: Partial<MuiIconProps>;
  text: Partial<TypographyProps> | Partial<TextProps>;
};

export type InputErrorProps = Omit<BoxProps, "slot"> & {
  slot?: {
    root?: Slot["root"];
    icon?: Slot["icon"];
    text?: Slot["text"];
  };
  slotProps?: {
    icon?: SlotProps["icon"];
    text?: SlotProps["text"];
  };
};
