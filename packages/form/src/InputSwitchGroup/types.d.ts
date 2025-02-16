import type { ListProps } from "@mui/material/List";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import type { SwitchProps } from "@mui/material/Switch";
import type { Option, RHFInputProps } from "@shared/types-react/rhf";
import type { AnyObject } from "@shared/types/common";
import type { TextProps } from "@shared/typo/Text";
import type { ReactNode } from "react";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";

export type SwitchGroupOption<T extends AnyObject = AnyObject> = Option<
  T & {
    InputProps?: Partial<
      Omit<SwitchProps, "name" | "value" | "checked" | "disabled" | "onChange">
    >;
  }
>;

export type InputSwitchGroupProps<T extends AnyObject = AnyObject> = Omit<
  FormGroupCommonProps,
  "onChange" | "slotProps"
> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: SwitchGroupOption<T>[];
  value?: SwitchGroupOption<T>[];
  onChange?: (options?: SwitchGroupOption<T>[]) => void;
  /**
   * @default true
   */
  eventStopPropagation?: boolean;
  /**
   * @default false
   */
  eventPreventDefault?: boolean;
  slotProps?: FormGroupCommonProps["slotProps"] & {
    labelTypography?: Partial<TextProps<"label">>;
    error?: Partial<InputErrorProps>;
    list?: Partial<ListProps>;
    option?: Partial<ListItemButtonProps>;
  };
};

export type RHFSwitchGroupProps<T extends AnyObject = AnyObject> =
  RHFInputProps &
    Omit<
      InputSwitchGroupProps<T>,
      "errorText" | "error" | "onChange" | "value" | "name"
    > & {
      defaultValue?: string;
    };
