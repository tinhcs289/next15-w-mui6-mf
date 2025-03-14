"use client";

import { ButtonBaseActions } from "@mui/material";
import WithRequiredMark from "@shared/typo/WithRequiredMark";
import type { ChangeEvent, ComponentType } from "react";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";
import type { RHFRenderInput } from "../../types";
import ErrorText from "./components/ErrorText";
import FormGroupCommonStyled from "./components/FormGroupCommonStyled";
import SwitchStyled from "./components/SwitchStyled";
import type { InputSwitchWithLabelProps, RHFSwitchWithLabelProps } from "./types";

const InputSwitchWithLabel = forwardRef<HTMLDivElement, InputSwitchWithLabelProps>(
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
      return;
    }, [label, required, $Error]);

    const actionRef = useRef<ButtonBaseActions>(null);

    const $Control = useMemo(() => {
      return (
        <SwitchStyled
          size="small"
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
          data-error={error}
          inputRef={inputRef}
          {...inputProps}
        />
      );
    }, [
      name,
      checked,
      value,
      inputProps,
      inputRef,
      handleOnChange,
    ]);

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
              ...slotProps?.control?.sx,
              width: "42px",
              maxWidth: "42px",
              justifyContent: "center",
              alignItems: "center",
              pt: 0,
              height: "33.75px",
            },
          },
          label: {
            ...slotProps?.label,
            sx: {
              ...slotProps?.label?.sx,
              pl: 1,
              py: "10px",
              mb: 0,
              justifyContent: "space-between",
              width: "calc(100% - 42px)",
              display: "flex",
              alignItems: "flex-start",
            }
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
) as ComponentType<InputSwitchWithLabelProps>;
InputSwitchWithLabel.displayName = "InputSwitchWithLabel";

function RHFSwitchWithLabel(props: RHFSwitchWithLabelProps) {
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
      <InputSwitchWithLabel
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


export { InputSwitchWithLabel, RHFSwitchWithLabel };

