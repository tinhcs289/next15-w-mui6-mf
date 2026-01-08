"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import mergeRefs from "../../helpers/mergeRefs";
import type { RHFControlledInputProps } from "../../rhf.types";
import type { InputTextProps, TextInputVariants } from "./InputText";
import InputText from "./InputText";

export type RHFTextProps<V extends TextInputVariants> =
  RHFControlledInputProps<InputTextProps<V>>;

const RHFText = forwardRef(
  <V extends TextInputVariants>(
    {
      name,
      control,
      rules,
      shouldUnregister = false,
      onChange: onChangeExternal,
      onBlur: onBlurExternal,
      // MuiInput contains an input of type text with both value and defaultValue props.
      // Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).
      // More info: https://react.dev/link/controlled-components
      // RHF required a controlled input element, so removing this props is important.
      defaultValue: _,
      ...otherProps
    }: Omit<RHFTextProps<V>, "ref">,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Controller<Record<string, any>, string, Record<string, any>>
        name={String(name)}
        control={control}
        rules={rules}
        shouldUnregister={shouldUnregister}
        render={({
          field: { onBlur, onChange, value, ref: fieldRef },
          fieldState: { invalid, error, isTouched },
        }) => {
          return (
            <InputText
              {...(otherProps as unknown as InputTextProps<V>)}
              ref={mergeRefs(ref, fieldRef)}
              name={String(name)}
              value={value ?? ""}
              onChange={(...args) => {
                onChange(...args);
                onChangeExternal?.(...args);
              }}
              onBlur={(...args) => {
                onBlur();
                onBlurExternal?.(...args);
              }}
              error={invalid}
              required={!!rules?.required}
              errorText={error?.message}
            />
          );
        }}
      />
    );
  }
) as <V extends TextInputVariants>(props: RHFTextProps<V>) => JSX.Element;
(RHFText as ComponentType).displayName = "RHFText";

export default RHFText;