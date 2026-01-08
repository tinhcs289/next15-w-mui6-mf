"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef } from "react";
import type { InputAttributes, PatternFormatProps } from "react-number-format";
import { PatternFormat } from "react-number-format";
import type { InputTextProps, TextInputVariants } from "./InputText";
import InputText from "./InputText";

export type InputTextPatternProps<Variant extends TextInputVariants> =
  InputTextProps<Variant> & PatternFormatProps;

const InputTextPattern = forwardRef(
  <Variant extends TextInputVariants>(
    { inputRef, ...otherProps }: InputTextPatternProps<Variant>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <PatternFormat
        customInput={InputText as ComponentType<InputAttributes>}
        allowEmptyFormatting
        {...otherProps}
        ref={ref}
        getInputRef={inputRef}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: InputTextPatternProps<Variant>
) => JSX.Element;
(InputTextPattern as ComponentType).displayName = "InputTextPattern";

export default InputTextPattern;