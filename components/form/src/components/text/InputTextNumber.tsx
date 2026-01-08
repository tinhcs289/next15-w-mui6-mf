"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback } from "react";
import type {
  InputAttributes,
  NumberFormatValues,
  NumericFormatProps,
} from "react-number-format";
import { NumericFormat } from "react-number-format";
import type { InputTextProps, TextInputVariants } from "./InputText";
import InputText from "./InputText";

export type InputTextNumberProps<Variant extends TextInputVariants> =
  InputTextProps<Variant> & NumericFormatProps;

export type IsAllowed = (values: NumberFormatValues) => boolean;

const defaultIsAllowed = (_: NumberFormatValues) => true;

// JavaScript only handles numbers with up to 16 digits.
const maxLengthUpTo16Digits: IsAllowed = (values) =>
  values?.value?.length <= 16 || values?.value === "";

const InputTextNumber = forwardRef(
  <Variant extends TextInputVariants>(
    {
      isAllowed: isAllowedProp = defaultIsAllowed,
      inputRef,
      ...otherProps
    }: InputTextNumberProps<Variant>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const isAllowed: IsAllowed = useCallback(
      (values) => maxLengthUpTo16Digits(values) && isAllowedProp(values),
      [isAllowedProp]
    );
    return (
      <NumericFormat
        customInput={InputText as ComponentType<InputAttributes>}
        allowNegative={false}
        allowLeadingZeros={false}
        isAllowed={isAllowed}
        {...otherProps}
        getInputRef={inputRef}
        ref={ref}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: InputTextNumberProps<Variant>
) => JSX.Element;
(InputTextNumber as ComponentType).displayName = "InputTextNumber";

export default InputTextNumber;