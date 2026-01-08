"use client";

import debounce from "lodash/debounce";
import type { ChangeEvent, ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller, FieldValues } from "react-hook-form";
import type { NumberFormatValues, SourceInfo } from "react-number-format";
import type { RHFRenderInput, RHFControlledInputProps } from "../../types";
import type { TextInputVariants } from "./InputText";
import type { InputTextNumberProps } from "./InputTextNumber";
import InputTextNumber from "./InputTextNumber";

const withDebounced =
  <Variant extends TextInputVariants>(
    WrappedComponent: ComponentType<InputTextNumberProps<Variant>>,
    ms: number
  ): ComponentType<InputTextNumberProps<Variant>> =>
  (props: InputTextNumberProps<Variant>) => {
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

const TextNumberDebounced = withDebounced(InputTextNumber, 300);

export type RHFTextNumberProps<Variant extends TextInputVariants> =
  RHFControlledInputProps<InputTextNumberProps<Variant>>;

const RHFTextNumber = forwardRef(
  <Variant extends TextInputVariants>(
    {
      name,
      control,
      rules,
      defaultValue,
      shouldUnregister,
      ...otherProps
    }: Omit<RHFTextNumberProps<Variant>, "ref">,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const renderInput: RHFRenderInput = useCallback(
      ({
        field: { onBlur, onChange, value, ref },
        fieldState: { invalid, error },
      }) => (
        <TextNumberDebounced
          {...(otherProps as any)}
          name={String(name)}
          value={value || null}
          {...(defaultValue ? { defaultValue } : {})}
          onValueChange={({ floatValue }) => {
            onChange(typeof floatValue === "number" ? floatValue : null);
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
      <Controller<FieldValues, string>
        name={String(name)}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={renderInput}
      />
    );
  }
) as <Variant extends TextInputVariants>(
  props: RHFTextNumberProps<Variant>
) => JSX.Element;
(RHFTextNumber as ComponentType).displayName = "RHFTextNumber";

export default RHFTextNumber;