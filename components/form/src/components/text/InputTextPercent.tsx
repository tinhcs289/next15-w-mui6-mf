"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback } from "react";
import type { TextInputVariants } from "./InputText";
import type { InputTextNumberProps, IsAllowed } from "./InputTextNumber";
import InputTextNumber from "./InputTextNumber";

export const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0 && values.floatValue <= 100;
};

export const SUFFIX = " %";

export type InputTextPercentProps<Variant extends TextInputVariants> =
  InputTextNumberProps<Variant>;

const InputTextPercent = forwardRef(
  <Variant extends TextInputVariants>(
    {
      isAllowed: isAllowedProp = (_: any) => true,
      suffix = SUFFIX,
      ...otherProps
    }: InputTextPercentProps<Variant>,
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
        suffix={suffix}
        isAllowed={isAllowed}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: InputTextPercentProps<Variant>
) => JSX.Element;
(InputTextPercent as ComponentType).displayName = "InputTextPercent";

export default InputTextPercent;