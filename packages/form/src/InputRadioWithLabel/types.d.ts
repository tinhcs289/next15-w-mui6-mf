import type { RadioProps } from "@mui/material/Radio";
import type { RHFInputProps } from "@shared/types-react/rhf";
import type { ChangeEvent, ReactNode } from "react";
import type { TextProps } from "@shared/typo/Text";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";

export type InputRadioWithLabelProps = Omit<
  FormGroupCommonProps,
  "slotProps"
> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputRef?: RadioProps["inputRef"];
  inputProps?: Omit<
    RadioProps,
    "checked" | "error" | "onChange" | "value" | "name" | "inputRef"
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

export type RHFRadioWithLabelProps = RHFInputProps &
  Omit<
    InputRadioWithLabelProps,
    "checked" | "error" | "onChange" | "value" | "name"
  >;
