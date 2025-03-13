import type { TextFieldProps, TextFieldVariants } from "@mui/material/TextField";
import type { ComponentType, ReactNode } from "react";
import type { RHFInputProps } from "../types";

export type InputTextProps = Omit<TextFieldProps, "variant"> & {
  variant?: TextFieldVariants | "bootstrap";
  errorText?: ReactNode;
  StyledComponent?: ComponentType<TextFieldProps>;
};

export type RHFTextProps = RHFInputProps &
  Omit<
    InputTextProps,
    | "name"
    | "defaultValue"
    | "value"
    | "error"
    | "errorText"
    | "onChange"
    | "required"
  > & {
    defaultValue?: string;
  };
