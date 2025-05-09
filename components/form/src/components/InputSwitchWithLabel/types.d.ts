import type { SwitchProps } from "@mui/material/Switch";
import type { TextProps } from "@shared/typo/Text";
import type { ChangeEvent, ReactNode } from "react";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";
import type { RHFInputProps } from "../../types";

export type InputSwitchWithLabelProps = Omit<FormGroupCommonProps, "slotProps"> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputRef?: SwitchProps["inputRef"];
  inputProps?: Omit<
    SwitchProps,
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

export type RHFSwitchWithLabelProps = RHFInputProps &
  Omit<
  InputSwitchWithLabelProps,
    "checked" | "error" | "onChange" | "value" | "name"
  >;