import type { GridProps } from "@mui/material/Grid";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { TextFieldProps } from "@mui/material/TextField";
import type { RHFInputProps } from "@shared/types-react/rhf";
import type { ReactNode } from "react";
import type { NumericFormatProps } from "react-number-format";
import type { FormGroupCommonProps } from "../FormGroupCommon";
import type { InputErrorProps } from "../InputError";

export type InputNumberProps = TextFieldProps & NumericFormatProps;

export type InputNumberAdjustableProps = Omit<
  FormGroupCommonProps,
  "slotProps" | "onChange" | "value" | "name"
> & {
  placeholder?: string;
  name?: string;
  step?: number;
  min?: number | null;
  max?: number | null;
  iconDecrease?: ReactNode;
  labelDecrease?: string;
  iconIncrease?: ReactNode;
  labelIncrease?: string;
  slotProps?: FormGroupCommonProps["slotProps"] & {
    error?: Partial<InputErrorProps>;
    increaseGrid?: Partial<GridProps>;
    increaseButton?: Partial<IconButtonProps>;
    decreaseGrid?: Partial<GridProps>;
    decreaseButton?: Partial<IconButtonProps>;
    inputGrid?: Partial<GridProps>;
    input?: Partial<
      Omit<
        InputNumberProps,
        "inputRef" | "placeholder" | "onChange" | "onValueChange"
      >
    >;
  };
  inputRef?: InputNumberProps["inputRef"];
  value?: number | null;
  onChange?: (value?: number | null) => void;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
};

export type RHFNumberAdjustableProps = RHFInputProps &
  Omit<
    NumberAdjustableProps,
    | "error"
    | "errorText"
    | "onChange"
    | "onValueChange"
    | "value"
    | "name"
    | "required"
  >;
