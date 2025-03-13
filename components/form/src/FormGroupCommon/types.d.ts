import type { Grid2Props as GridProps } from "@mui/material/Grid2";
import type { ComponentType, ReactNode } from "react";

export type Slot = {
  root: ComponentType<GridProps>;
  label: ComponentType<GridProps>;
  control: ComponentType<GridProps>;
};

export type SlotProps = {
  root: Partial<GridProps>;
  label: Partial<GridProps>;
  control: Partial<GridProps>;
};

export type FormGroupCommonProps = Omit<GridProps, "slot"> & {
  label?: ReactNode;
  error?: boolean;
  slot?: {
    root?: Slot["root"];
    label?: Slot["label"];
    control?: Slot["control"];
  };
  slotProps?: {
    label?: SlotProps["label"];
    control?: SlotProps["control"];
  };
};
