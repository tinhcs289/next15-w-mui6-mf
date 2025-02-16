import type { TextFieldProps, TextFieldVariants } from "@mui/material/TextField";
import type { RHFInputProps } from "@shared/types-react/rhf";
import type { ComponentType, ReactNode } from "react";

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
