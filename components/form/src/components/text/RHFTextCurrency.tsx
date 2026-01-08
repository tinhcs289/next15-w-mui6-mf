"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback } from "react";
import type { TextInputVariants } from "./InputText";
import { isAllowedDefault } from "./InputTextCurrency";
import type { IsAllowed } from "./InputTextNumber";
import type { RHFTextNumberProps } from "./RHFTextNumber";
import RHFTextNumber from "./RHFTextNumber";

export type RHFTextCurrencyProps<Variant extends TextInputVariants> =
  RHFTextNumberProps<Variant>;

const RHFTextCurrency = forwardRef(
  <Variant extends TextInputVariants>(
    {
      isAllowed: isAllowedProp = (_: any) => true,
      decimalSeparator = ".",
      thousandSeparator = ",",
      ...otherProps
    }: Omit<RHFTextCurrencyProps<Variant>, "ref">,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const isAllowed: IsAllowed = useCallback(
      (values) => isAllowedDefault(values) && isAllowedProp(values),
      [isAllowedProp]
    );

    return (
      <RHFTextNumber
        {...(otherProps as RHFTextNumberProps<Variant>)}
        ref={ref}
        decimalSeparator={decimalSeparator}
        thousandSeparator={thousandSeparator}
        isAllowed={isAllowed}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: RHFTextCurrencyProps<Variant>
) => JSX.Element;
(RHFTextCurrency as ComponentType).displayName = "RHFTextCurrency";

export default RHFTextCurrency;