import type { CheckboxProps } from "@mui/material/Checkbox";
import type { ListProps } from "@mui/material/List";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import type { Option, RHFInputProps } from "@shared/types-react/rhf";
import type { AnyObject } from "@shared/types/common";
import type { ReactNode } from "react";
import type { TextProps } from "@shared/typo/Text";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";

export type CheckGroupOption<T extends AnyObject = AnyObject> = Option<
  T & {
    InputProps?: Partial<
      Omit<
        CheckboxProps,
        "name" | "value" | "checked" | "disabled" | "onChange"
      >
    >;
  }
>;

export type InputCheckGroupProps<T extends AnyObject = AnyObject> = Omit<
  FormGroupCommonProps,
  "onChange" | "slotProps"
> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: CheckGroupOption<T>[];
  value?: CheckGroupOption<T>[];
  onChange?: (options?: CheckGroupOption<T>[]) => void;
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

export type RHFCheckGroupProps<T extends AnyObject = AnyObject> = RHFInputProps &
  Omit<
  InputCheckGroupProps<T>,
    "errorText" | "error" | "onChange" | "value" | "name" | "defaultValue"
  > & {
    defaultValue?: string;
  };
