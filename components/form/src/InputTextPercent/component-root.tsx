"use client";

import type { ComponentType } from "react";
import { forwardRef, useCallback } from "react";
import type { InputTextNumberProps } from "../InputTextNumber";
import TextNumber, { RHFTextNumber } from "../InputTextNumber";
import type { InputTextPercentProps, IsAllowed, RHFTextPercentProps } from "./types";

const isAllowedDefault: IsAllowed = (values) => {
  if (!values?.value) return true;
  if (!values?.floatValue) return true;
  return values.floatValue >= 0 && values.floatValue <= 100;
};

function withPercentageFormat<
  P extends InputTextNumberProps = InputTextPercentProps,
>(WrappedComponent: ComponentType<P>, displayName: string) {
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


export const InputTextPercent = withPercentageFormat(
  TextNumber,
  "InputTextPercent"
) as ComponentType<InputTextPercentProps>;

export const RHFTextPercent = withPercentageFormat(
  RHFTextNumber,
  "RHFTextPercent"
) as ComponentType<RHFTextPercentProps>;
