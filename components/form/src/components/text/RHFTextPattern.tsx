"use client";

import debounce from "lodash/debounce";
import type { ChangeEvent, ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type { NumberFormatValues, SourceInfo } from "react-number-format";
import type { RHFRenderInput, RHFControlledInputProps } from "../../types";
import type { TextInputVariants } from "./InputText";
import type { InputTextPatternProps } from "./InputTextPattern";
import InputTextPattern from "./InputTextPattern";

const withDebounced =
  <Variant extends TextInputVariants>(
    WrappedComponent: ComponentType<InputTextPatternProps<Variant>>,
    ms: number
  ): ComponentType<InputTextPatternProps<Variant>> =>
  (props: InputTextPatternProps<Variant>) => {
    const handleValueChangeDelay = useMemo(() => {
      return debounce((values: NumberFormatValues, sourceInfo: SourceInfo) => {
        props?.onValueChange?.(values, sourceInfo);
      }, ms);
    }, [props]);

    const handleChangeDelay = useMemo(() => {
      return debounce((e: ChangeEvent<any>) => {
        props?.onChange?.(e);
      }, ms);
    }, [props]);

    return (
      <WrappedComponent
        {...props}
        onValueChange={handleValueChangeDelay}
        onChange={handleChangeDelay}
      />
    );
  };

const InputTextPatternDebounced = withDebounced(InputTextPattern, 300);

export type RHFTextPatternProps<Variant extends TextInputVariants> =
  RHFControlledInputProps<InputTextPatternProps<Variant>>;

const RHFTextPattern = forwardRef(
  <Variant extends TextInputVariants>(
    {
      name,
      control,
      rules,
      defaultValue,
      shouldUnregister,
      ...otherProps
    }: Omit<RHFTextPatternProps<Variant>, "ref">,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const renderInput: RHFRenderInput = useCallback(
      ({
        field: { onBlur, onChange, value, ref },
        fieldState: { invalid, error },
      }) => (
        <InputTextPatternDebounced
          {...(otherProps as any)}
          name={String(name)}
          value={value ?? ""}
          defaultValue={defaultValue ?? ""}
          onValueChange={({ formattedValue }) => {
            onChange(formattedValue);
          }}
          onBlur={onBlur}
          inputRef={ref}
          error={invalid}
          required={!!rules?.required}
          errorText={error?.message}
        />
      ),
      [name, rules?.required, otherProps, defaultValue]
    );
    return (
      <Controller
        name={String(name)}
        control={control}
        rules={rules}
        defaultValue={defaultValue ?? ""}
        shouldUnregister={shouldUnregister}
        render={renderInput}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: RHFTextPatternProps<Variant>
) => JSX.Element;
(RHFTextPattern as ComponentType).displayName = "RHFTextPattern";

export default RHFTextPattern;