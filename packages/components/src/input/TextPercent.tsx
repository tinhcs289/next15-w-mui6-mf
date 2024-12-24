"use client";

import type { ComponentType } from "react";
import { forwardRef, useCallback } from "react";
import type { NumberFormatValues } from "react-number-format";
import type { RHFTextNumberProps, TextNumberProps } from "./TextNumber";
import TextNumber, { RHFTextNumber } from "./TextNumber";

type TextPercentProps = TextNumberProps;
type RHFTextPercentProps = RHFTextNumberProps;

type IsAllowed = (values: NumberFormatValues) => boolean;

const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0 && values.floatValue <= 100;
};

function withPercentageFormat<P extends TextNumberProps = TextPercentProps>(
  WrappedComponent: ComponentType<P>,
  displayName: string
) {
  const CompositedComponent = forwardRef<HTMLElement, P>(
    ({ isAllowed, suffix = " %", ...otherProps }, ref) => {
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
          suffix={suffix}
          isAllowed={isAllowedMemo}
        />
      );
    }
  );
  CompositedComponent.displayName = displayName;
  return CompositedComponent;
}

const TextPercent = withPercentageFormat(
  TextNumber,
  "TextPercent"
) as ComponentType<TextPercentProps>;

const RHFTextPercent = withPercentageFormat(
  RHFTextNumber,
  "RHFTextPercent"
) as ComponentType<RHFTextPercentProps>;

export default TextPercent;
export { RHFTextPercent };
export type { RHFTextPercentProps, TextPercentProps };

