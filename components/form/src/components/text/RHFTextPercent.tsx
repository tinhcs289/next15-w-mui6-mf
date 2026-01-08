"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback } from "react";
import type { TextInputVariants } from "./InputText";
import type { IsAllowed } from "./InputTextNumber";
import { isAllowedDefault, SUFFIX } from "./InputTextPercent";
import type { RHFTextNumberProps } from "./RHFTextNumber";
import RHFTextNumber from "./RHFTextNumber";

export type RHFTextPercentProps<Variant extends TextInputVariants> =
  RHFTextNumberProps<Variant>;

const RHFTextPercent = forwardRef(
  <Variant extends TextInputVariants>(
    {
      isAllowed: isAllowedProp = (_: any) => true,
      suffix = SUFFIX,
      ...otherProps
    }: Omit<RHFTextPercentProps<Variant>, "ref">,
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
        suffix={suffix}
        isAllowed={isAllowed}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: RHFTextPercentProps<Variant>
) => JSX.Element;
(RHFTextPercent as ComponentType).displayName = "RHFTextPercent";

export default RHFTextPercent;
