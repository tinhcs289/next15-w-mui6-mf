import type { SvgIconTypeMap } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { TypographyProps } from "@mui/material/Typography";
import type { TextProps } from "@shared/typo/Text";
import type { ComponentType } from "react";

type Icon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
type SvgImage = ComponentType<
  SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>
>;
type MuiIcon = Icon | SvgImage | ComponentType<any>;
type MuiIconProps = SvgIconProps<SvgIconTypeMap["defaultComponent"], {}>;


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
