import type { RHFInputProps } from "@shared/types-react/rhf";
import type { DOMAttributes, InputHTMLAttributes } from "react";

export type InputHiddenProps = DOMAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>;

export type RHFHiddenProps = RHFInputProps<InputHiddenProps>;
