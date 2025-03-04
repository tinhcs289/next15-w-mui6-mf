"use client";

import type { ComponentType } from "react";
import { forwardRef, useCallback } from "react";
import type { InputTextNumberProps } from "../InputTextNumber";
import TextNumber, { RHFTextNumber } from "../InputTextNumber";
import type { InputTextCurrencyProps, IsAllowed, RHFTextCurrencyProps } from "./types";

const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0;
};

function withCurrencyFormat<
  P extends InputTextNumberProps = InputTextNumberProps,
>(WrappedComponent: ComponentType<P>, displayName: string) {
  const CompositedComponent = forwardRef<HTMLElement, P>(
    (
      {
        isAllowed,
        decimalSeparator = ".",
        thousandSeparator = ",",
        ...otherProps
      },
      ref
    ) => {
      const isAllowedMemo: IsAllowed = useCallback(
        (values) => {
          if (typeof isAllowed !== "function") return isAllowedDefault(values);
          return isAllowedDefault(values) && isAllowed(values) === true;
        },
        [isAllowed]
      );

      return (
        <WrappedComponent
          {...(otherProps as any)}
          ref={ref as any}
          decimalSeparator={decimalSeparator}
          thousandSeparator={thousandSeparator}
          isAllowed={isAllowedMemo}
        />
      );
    }
  );
  CompositedComponent.displayName = displayName;
  return CompositedComponent;
}


export const InputTextCurrency = withCurrencyFormat(
  TextNumber,
  "InputTextCurrency"
) as ComponentType<InputTextCurrencyProps>;

export const RHFTextCurrency = withCurrencyFormat(
  RHFTextNumber,
  "RHFTextCurrency"
) as ComponentType<RHFTextCurrencyProps>;
