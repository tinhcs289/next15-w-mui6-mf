"use client";

import debounce from "lodash/debounce";
import type { ChangeEvent, ComponentType } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type {
  InputAttributes,
  NumberFormatValues,
  SourceInfo,
} from "react-number-format";
import { NumericFormat } from "react-number-format";
import Text from "../InputText";
import type { RHFRenderInput } from "../types";
import type { InputTextNumberProps, IsAllowed, RHFTextNumberProps } from "./types";

const isAllowedDefault: IsAllowed = (values) =>
  values?.value?.length <= 16 || values?.value === "";

export const InputTextNumber = forwardRef<HTMLDivElement, InputTextNumberProps>(
  ({ isAllowed, inputRef, ...otherProps }, ref) => {
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
        getInputRef={inputRef}
        // @ts-ignore
        ref={ref}
      />
    );
  }
) as ComponentType<InputTextNumberProps>;
InputTextNumber.displayName = "InputTextNumber";

function createNumberFieldDebounced(ms: number) {
  return function withDebounceChangeHandler(
    WrappedComponent: ComponentType<InputTextNumberProps>
  ) {
    return function NumberFieldWithDebounceChangeHandler(
      props: InputTextNumberProps
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
    } as ComponentType<InputTextNumberProps>;
  };
}

const TextNumberDebounced = createNumberFieldDebounced(300)(InputTextNumber);

export function RHFTextNumber({
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
