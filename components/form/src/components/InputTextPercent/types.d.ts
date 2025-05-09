import type { NumberFormatValues } from "react-number-format";
import type { RHFTextNumberProps, InputTextNumberProps } from "../InputTextNumber";

export type InputTextPercentProps = InputTextNumberProps;
export type RHFTextPercentProps = RHFTextNumberProps;
export type IsAllowed = (values: NumberFormatValues) => boolean;
