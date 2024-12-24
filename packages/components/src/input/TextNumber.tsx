"use client";

import debounce from "lodash/debounce";
import type { ChangeEvent, ComponentType } from "react";
import { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type {
  InputAttributes,
  NumberFormatValues,
  NumericFormatProps,
  SourceInfo,
} from "react-number-format";
import { NumericFormat } from "react-number-format";
import type { RHFInputProps, RHFRenderInput } from "@repo/types-react/rhf";
import type { TextProps } from "./Text";
import Text from "./Text";

type TextNumberProps = TextProps & NumericFormatProps;

type RHFTextNumberProps = RHFInputProps &
  Omit<
    TextNumberProps,
    | "error"
    | "errorText"
    | "onChange"
    | "value"
    | "name"
    | "defaultValue"
    | "onValueChange"
    | "required"
  > & {
    defaultValue?: string | number;
  };

type IsAllowed = (values: NumberFormatValues) => boolean;

const isAllowedDefault: IsAllowed = (values) =>
  values?.value?.length <= 16 || values?.value === "";

function TextNumber(props: TextNumberProps) {
  const { isAllowed, ...otherProps } = props;
  const isAllowedMemo: IsAllowed = useCallback(
    (values) => {
      if (typeof isAllowed !== "function") return isAllowedDefault(values);
      return isAllowedDefault(values) && isAllowed(values) === true;
    },
    [isAllowed]
  );
  return (
    <NumericFormat
      customInput={Text as ComponentType<InputAttributes>}
      allowNegative={false}
      allowLeadingZeros={false}
      isAllowed={isAllowedMemo}
      {...otherProps}
    />
  );
}

function createNumberFieldDebounced(ms: number) {
  return function withDebounceChangeHandler(
    WrappedComponent: ComponentType<TextNumberProps>
  ) {
    return function NumberFieldWithDebounceChangeHandler(
      props: TextNumberProps
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
    } as ComponentType<TextNumberProps>;
  };
}

const TextNumberDebounced = createNumberFieldDebounced(300)(TextNumber);

function RHFTextNumber({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  ...inputProps
}: RHFTextNumberProps) {
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, ref },
      fieldState: { invalid, error },
    }) => (
      <TextNumberDebounced
        name={name as string}
        value={value || null}
        {...(defaultValue ? { defaultValue } : {})}
        onValueChange={({ floatValue }) => {
          onChange(typeof floatValue === "number" ? floatValue : null);
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

export default TextNumber;
export { createNumberFieldDebounced, RHFTextNumber, TextNumberDebounced };
export type { RHFTextNumberProps, TextNumberProps };
