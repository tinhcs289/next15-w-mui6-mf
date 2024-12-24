"use client";

import type { ComponentType } from "react";
import { forwardRef, useCallback } from "react";
import type { NumberFormatValues } from "react-number-format";
import type { RHFTextNumberProps, TextNumberProps } from "./TextNumber";
import TextNumber, { RHFTextNumber } from "./TextNumber";

type TextCurrencyProps = TextNumberProps;
type RHFTextCurrencyProps = RHFTextNumberProps;

type IsAllowed = (values: NumberFormatValues) => boolean;

const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0;
};

function withCurrencyFormat<P extends TextNumberProps = TextNumberProps>(
  WrappedComponent: ComponentType<P>,
  displayName: string
) {
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

const TextCurrency = withCurrencyFormat(
  TextNumber,
  "TextCurrency"
) as ComponentType<TextCurrencyProps>;

const RHFTextCurrency = withCurrencyFormat(
  RHFTextNumber,
  "RHFTextCurrency"
) as ComponentType<RHFTextCurrencyProps>;

export default TextCurrency;
export { RHFTextCurrency };
export type { RHFTextCurrencyProps, TextCurrencyProps };

