import type { CheckboxProps } from "@mui/material/Checkbox";
import type { TextProps } from "@shared/typo/Text";
import type { ChangeEvent, ReactNode } from "react";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";
import type { RHFInputProps } from "../types";

export type InputCheckWithLabelProps = Omit<FormGroupCommonProps, "slotProps"> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputRef?: CheckboxProps["inputRef"];
  inputProps?: Omit<
    CheckboxProps,
    "checked" | "error" | "onChange" | "value" | "name" | "inputRef" | "action"
  >;
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
  };
};

export type RHFCheckWithLabelProps = RHFInputProps &
  Omit<
    InputCheckWithLabelProps,
    "checked" | "error" | "onChange" | "value" | "name"
  >;