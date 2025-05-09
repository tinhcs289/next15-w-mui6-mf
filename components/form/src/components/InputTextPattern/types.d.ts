import type { PatternFormatProps } from "react-number-format";
import type { InputTextProps } from "../InputText";
import type { RHFInputProps } from "../../types";

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
