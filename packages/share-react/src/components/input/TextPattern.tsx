"use client";

import debounce from "lodash/debounce";
import { ChangeEvent, useCallback, useMemo, type ComponentType } from "react";
import { Controller } from "react-hook-form";
import type {
  InputAttributes,
  NumberFormatValues,
  PatternFormatProps,
  SourceInfo,
} from "react-number-format";
import { PatternFormat } from "react-number-format";
import type { RHFInputProps, RHFRenderInput } from "../../types/rhf";
import type { TextProps } from "./Text";
import Text from "./Text";

type TextPatternProps = TextProps & PatternFormatProps;

type RHFTextPatternProps = RHFInputProps &
  Omit<
    TextPatternProps,
    | "error"
    | "errorText"
    | "onChange"
    | "value"
    | "name"
    | "defaultValue"
    | "onValueChange"
    | "required"
  > & {
    defaultValue?: string;
  };

function TextPattern(props: TextPatternProps) {
  return (
    <PatternFormat
      customInput={Text as ComponentType<InputAttributes>}
      allowEmptyFormatting
      {...props}
    />
  );
}

function createNumericFieldDebounce(ms: number) {
  return function withDebounceChangeHandler(
    WrappedComponent: ComponentType<TextPatternProps>
  ) {
    return function NumericFieldWithDebounceChangeHandler(
      props: TextPatternProps
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
    } as ComponentType<TextPatternProps>;
  };
}

const TextPatternDebounced = createNumericFieldDebounce(300)(TextPattern);

function RHFTextPattern({
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

export default TextPattern;
export { createNumericFieldDebounce, RHFTextPattern, TextPatternDebounced };
export type { RHFTextPatternProps, TextPatternProps };

