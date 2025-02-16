import type { RHFInputProps } from "@shared/types-react/rhf";
import type { PatternFormatProps } from "react-number-format";
import type { InputTextProps } from "../InputText";

export type InputTextPatternProps = InputTextProps & PatternFormatProps;
export type RHFTextPatternProps = RHFInputProps &
  Omit<
    InputTextPatternProps,
    | "error"
    | "errorText"
    | "onChange"
    | "value"
    | "name"
    | "defaultValue"
    | "onValueChange"
    | "required"
  > & {
    defaultValue?: string;
  };
