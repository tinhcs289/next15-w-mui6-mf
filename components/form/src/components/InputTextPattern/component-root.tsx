"use client";

import debounce from "lodash/debounce";
import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useMemo,
  type ComponentType,
} from "react";
import { Controller } from "react-hook-form";
import type {
  InputAttributes,
  NumberFormatValues,
  SourceInfo,
} from "react-number-format";
import { PatternFormat } from "react-number-format";
import Text from "../InputText";
import type { RHFRenderInput } from "../../types";
import type { InputTextPatternProps, RHFTextPatternProps } from "./types";

export const InputTextPattern = forwardRef<HTMLDivElement, InputTextPatternProps>(
  ({ inputRef, ...props }, ref) => {
    return (
      <PatternFormat
        customInput={Text as ComponentType<InputAttributes>}
        allowEmptyFormatting
        {...props}
        // @ts-ignore
        ref={ref}
        getInputRef={inputRef}
      />
    );
  }
) as ComponentType<InputTextPatternProps>;
InputTextPattern.displayName = "InputTextPattern";

function createNumericFieldDebounce(ms: number) {
  return function withDebounceChangeHandler(
    WrappedComponent: ComponentType<InputTextPatternProps>
  ) {
    return function NumericFieldWithDebounceChangeHandler(
      props: InputTextPatternProps
    ) {
      const handleValueChangeDelay = useMemo(() => {
        return debounce(
          (values: NumberFormatValues, sourceInfo: SourceInfo) => {
            props?.onValueChange?.(values, sourceInfo);
          },
          ms
        );
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
    } as ComponentType<InputTextPatternProps>;
  };
}
const TextPatternDebounced = createNumericFieldDebounce(300)(InputTextPattern);

export function RHFTextPattern({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  ...inputProps
}: RHFTextPatternProps) {
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, ref },
      fieldState: { invalid, error },
    }) => (
      <TextPatternDebounced
        name={name as string}
        value={value}
        {...(defaultValue ? { defaultValue } : {})}
        onValueChange={({ formattedValue }) => {
          onChange(formattedValue);
        }}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        {...inputProps}
        required={!!rules?.required}
        errorText={error?.message ?? undefined}
      />
    ),
    [name, rules?.required, inputProps, defaultValue]
  );
  return (
    <Controller
      name={name || ""}
      control={control}
      rules={rules}
      {...(defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === "boolean" ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
