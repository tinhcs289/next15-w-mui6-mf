import type { ListProps } from "@mui/material/List";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import type { RadioProps } from "@mui/material/Radio";
import type { TextProps } from "@shared/typo/Text";
import type { ReactNode } from "react";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";
import type { AnyObject, Option, RHFInputProps } from "../../types";

export type RadioGroupOption<T extends AnyObject = AnyObject> = Option<
  T & {
    InputProps?: Partial<
      Omit<RadioProps, "name" | "value" | "checked" | "disabled" | "onChange">
    >;
  }
>;

export type InputRadioGroupProps<T extends AnyObject = AnyObject> = Omit<
  FormGroupCommonProps,
  "onChange" | "slotProps"
> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: RadioGroupOption<T>[];
  value?: RadioGroupOption<T>;
  onChange?: (option?: RadioGroupOption<T> | null) => void;
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

export type RHFRadioGroupProps<T extends AnyObject = AnyObject> = RHFInputProps &
  Omit<
    InputRadioGroupProps<T>,
    "errorText" | "error" | "onChange" | "value" | "name" | "defaultValue"
  > & {
    defaultValue?: string;
  };