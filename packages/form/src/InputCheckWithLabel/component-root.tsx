"use client";

import type { ButtonBaseActions } from "@mui/material/ButtonBase";
import type { RHFRenderInput } from "@shared/types-react/rhf";
import WithRequiredMark from "@shared/typo/WithRequiredMark";
import type { ChangeEvent, ComponentType } from "react";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";
import CheckboxStyled from "./components/CheckboxStyled";
import ErrorText from "./components/ErrorText";
import FormGroupCommonStyled from "./components/FormGroupCommonStyled";
import { InputCheckWithLabelProps, RHFCheckWithLabelProps } from "./types";

const InputCheckWithLabel = forwardRef<HTMLDivElement, InputCheckWithLabelProps>(
  (
    {
      name,
      label,
      error,
      checked,
      value,
      onChange,
      errorText,
      required,
      inputRef,
      inputProps,
      eventStopPropagation = true,
      eventPreventDefault = false,
      slotProps = {},
      onBlur,
      ...formControlProps
    },
    ref
  ) => {
    const formgroupRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => formgroupRef.current!, []);

    const handleOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (eventStopPropagation) {
          event?.stopPropagation?.();
        }
        if (eventPreventDefault) {
          event?.preventDefault?.();
        }
        onChange?.(event, checked);
      },
      [eventStopPropagation, eventPreventDefault, onChange]
    );

    const $Error = useMemo(
      () =>
        !!error && !!errorText ? (
          <ErrorText {...slotProps?.error}>{errorText}</ErrorText>
        ) : null,
      [error, errorText, slotProps?.error]
    );

    const $Label = useMemo(() => {
      if (!label) return null;
      return (
        <>
          <WithRequiredMark required={required}>{label}</WithRequiredMark>
          {$Error}
        </>
      );
    }, [label, required, $Error]);

    const actionRef = useRef<ButtonBaseActions>(null);

    const $Control = useMemo(() => {
      return (
        <CheckboxStyled
          name={name}
          checked={!!checked}
          onChange={handleOnChange}
          onFocus={(e) => {
            actionRef?.current?.focusVisible?.();
            formgroupRef?.current?.classList?.add?.("Mui-focusVisible");
            inputProps?.onFocus?.(e);
          }}
          action={actionRef}
          value={value}
          color="primary"
          size="small"
          inputRef={inputRef}
          {...inputProps}
        />
      );
    }, [name, checked, value, inputProps, inputRef, handleOnChange]);

    return (
      <FormGroupCommonStyled
        label={$Label}
        onBlur={(e) => {
          formgroupRef?.current?.classList?.remove?.("Mui-focusVisible");
          onBlur?.(e);
        }}
        slotProps={{
          ...slotProps,
          control: {
            ...slotProps?.control,
            sx: {
              maxWidth: "28px",
              alignItems: "center",
              pt: 0,
              height: "33.75px",
              ...slotProps?.control?.sx,
            },
          },
          label: {
            ...slotProps?.label,
            sx: {
              pl: 1,
              py: "10px",
              mb: 0,
              justifyContent: "space-between",
              width: "calc(100% - 28px)",
              display: "flex",
              alignItems: "flex-start",
              ...slotProps?.label?.sx,
            },
          },
        }}
        {...formControlProps}
        error={error}
        ref={formgroupRef}
      >
        {$Control}
      </FormGroupCommonStyled>
    );
  }
) as ComponentType<InputCheckWithLabelProps>;
InputCheckWithLabel.displayName = "InputCheckWithLabel";

function RHFCheckWithLabel(props: RHFCheckWithLabelProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    label,
    inputProps,
    ...otherProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, name, ref },
      fieldState: { invalid, error },
    }) => (
      <InputCheckWithLabel
        label={label}
        name={name}
        value={!!value}
        defaultValue={defaultValue ?? undefined}
        checked={value === true}
        {...otherProps}
        onChange={onChange}
        inputRef={ref}
        inputProps={{ onBlur, ...inputProps }}
        error={invalid}
        required={!!rules?.required}
        errorText={error?.message ?? undefined}
      />
    ),
    [rules?.required, inputProps, defaultValue, label, otherProps]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? undefined}
      shouldUnregister={!!shouldUnregister}
      render={renderInput}
    />
  );
}

export { InputCheckWithLabel, RHFCheckWithLabel };

