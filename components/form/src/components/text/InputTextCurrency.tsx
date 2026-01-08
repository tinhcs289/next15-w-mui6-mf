"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback } from "react";
import type { TextInputVariants } from "./InputText";
import type { InputTextNumberProps, IsAllowed } from "./InputTextNumber";
import InputTextNumber from "./InputTextNumber";

export const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0;
};

export type InputTextCurrencyProps<Variant extends TextInputVariants> =
  InputTextNumberProps<Variant>;

const InputTextCurrency = forwardRef(
  <Variant extends TextInputVariants>(
    {
      isAllowed: isAllowedProp = (_: any) => true,
      decimalSeparator = ".",
      thousandSeparator = ",",
      ...otherProps
    }: InputTextCurrencyProps<Variant>,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const isAllowed: IsAllowed = useCallback(
      (values) => isAllowedDefault(values) && isAllowedProp(values),
      [isAllowedProp]
    );

    return (
      <InputTextNumber
        {...(otherProps as InputTextNumberProps<Variant>)}
        ref={ref}
        decimalSeparator={decimalSeparator}
        thousandSeparator={thousandSeparator}
        isAllowed={isAllowed}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: InputTextCurrencyProps<Variant>
) => JSX.Element;
(InputTextCurrency as ComponentType).displayName = "InputTextCurrency";

export default InputTextCurrency;