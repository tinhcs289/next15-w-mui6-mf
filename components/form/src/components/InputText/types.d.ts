import type {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import type {
  ComponentType,
  FocusEvent,
  ForwardedRef,
  JSX,
  PropsWithChildren,
  ReactNode,
} from "react";

export type TextInputVariants = TextFieldVariants | "bootstrap";
export type MuiVariant<V extends TextInputVariants> = V extends "standard"
  ? "standard"
  : V extends "filled"
    ? "filled"
    : "outlined";
export type MuiTextFieldProps<V extends TextInputVariants> = TextFieldProps<
  MuiVariant<V>
>;

export type InputTextProps<V extends TextInputVariants> = Omit<
  MuiTextFieldProps<V>,
  "variant"
> & {
  variant?: V;
  errorText?: ReactNode;
  StyledComponent?: ComponentType<MuiTextFieldProps<V>>;
};
