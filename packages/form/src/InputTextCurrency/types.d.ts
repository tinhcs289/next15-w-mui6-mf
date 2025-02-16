import type { NumberFormatValues } from "react-number-format";
import type { RHFTextNumberProps, InputTextNumberProps } from "../InputTextNumber";

export type InputTextCurrencyProps = InputTextNumberProps;
export type RHFTextCurrencyProps = RHFTextNumberProps;
export type IsAllowed = (values: NumberFormatValues) => boolean;
