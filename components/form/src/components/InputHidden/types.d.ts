import type { DOMAttributes, InputHTMLAttributes } from "react";
import type { RHFInputProps } from "../../types";

export type InputHiddenProps = DOMAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>;

export type RHFHiddenProps = RHFInputProps<InputHiddenProps>;
