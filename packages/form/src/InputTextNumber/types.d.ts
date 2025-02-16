import type { RHFInputProps } from "@shared/types-react/rhf";
import type {
  NumberFormatValues,
  NumericFormatProps,
} from "react-number-format";
import type { InputTextProps } from "../InputText";

export type InputTextNumberProps = InputTextProps & NumericFormatProps;

export type RHFTextNumberProps = RHFInputProps &
  Omit<
    InputTextNumberProps,
    | "error"
    | "errorText"
    | "onChange"
    | "value"
    | "name"
    | "defaultValue"
    | "onValueChange"
    | "required"
  > & {
    defaultValue?: string | number;
  };

export type IsAllowed = (values: NumberFormatValues) => boolean;
