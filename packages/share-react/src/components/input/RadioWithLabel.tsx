"use client";

import type { InputErrorProps } from "./InputError";
import InputError from "./InputError";
import type { FormGroupCommonProps } from "./FormGroupCommon";
import FormGroupCommon from "./FormGroupCommon";
import type { TypoProps } from "../typo/Typo";
import Typo from "../typo/Typo";
import WithRequiredMark from "../typo/WithRequiredMark";
import type { RHFInputProps, RHFRenderInput } from "../../types/rhf";
import type { MuiSx } from "../../types/mui";
import { ButtonBaseActions, useTheme } from "@mui/material";
import type { RadioProps } from "@mui/material/Radio";
import Radio from "@mui/material/Radio";
import type { ChangeEvent, ComponentType, ReactNode, JSX } from "react";
import { forwardRef, useCallback, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";

function ErrorText({
  sx,
  children,
  slotProps = {},
  ...props
}: InputErrorProps) {
  const { text: textProps, ...otherSlotProps } = slotProps;
  return (
    <InputError
      {...props}
      sx={{ display: "flex", ...sx }}
      slotProps={{
        ...otherSlotProps,
        text: {
          ...textProps,
          sx: {
            ...textProps?.sx,
            right: "unset",
            left: "-50%",
          },
        },
      }}
    >
      {children}
    </InputError>
  );
}

type RadioWithLabelProps = Omit<FormGroupCommonProps, "slotProps"> & {
  name?: string;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  checked?: boolean;
  value?: unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputRef?: RadioProps["inputRef"];
  inputProps?: Omit<
    RadioProps,
    "checked" | "error" | "onChange" | "value" | "name" | "inputRef"
  >;
  /**
   * @default true
   */
  eventStopPropagation?: boolean;
  /**
   * @default false
   */
  eventPreventDefault?: boolean;
  slotProps?: FormGroupCommonProps["slotProps"] & {
    labelTypography?: Partial<TypoProps<"label">>;
    error?: Partial<InputErrorProps>;
  };
};

function RadioWithLabelBase(props: RadioWithLabelProps) {
  const {
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
    sx,
    ...formControlProps
  } = props;
  const theme = useTheme();

  const {
    error: errorProps,
    label: labelRootProps,
    labelTypography: labelProps,
    control: controlProps,
    ...otherSlotProps
  } = slotProps;

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

  const handleUnCheck = useCallback(
    (event: any) => {
      if (!value) return;

      if (eventStopPropagation) {
        event?.stopPropagation?.();
      }
      if (eventPreventDefault) {
        event?.preventDefault?.();
      }
      onChange?.(event, false);
    },
    [value, eventStopPropagation, eventPreventDefault, onChange]
  );

  const $Error = useMemo(
    () =>
      !!error && !!errorText ? (
        <ErrorText {...errorProps}>{errorText}</ErrorText>
      ) : null,
    [error, errorText, errorProps]
  );

  const $Label = useMemo(() => {
    if (!label) return null;
    return (
      <>
        <Typo maxLines={3} component="label" clickable {...labelProps}>
          <WithRequiredMark required={required}>{label}</WithRequiredMark>
        </Typo>
        {$Error}
      </>
    );
    return;
  }, [label, required, labelProps, $Error]);

  const inputStyle = useMemo(() => {
    if (!error) return {};
    return {
      style: { ...(inputProps?.style || {}), color: theme.palette.error.main },
    };
  }, [error, inputProps?.style, theme]);

  const actionRef = useRef<ButtonBaseActions>(null);

  const $Control = useMemo(() => {
    return (
      <Radio
        name={name}
        checked={!!checked}
        onChange={handleOnChange}
        onClick={handleUnCheck}
        onFocus={(e) => {
          actionRef?.current?.focusVisible?.();
          inputProps?.onFocus?.(e);
        }}
        action={actionRef}
        value={value}
        color="primary"
        inputRef={inputRef}
        {...(inputStyle as any)}
        {...inputProps}
        sx={{ padding: "2px", ...inputProps?.sx }}
      />
    );
  }, [
    name,
    checked,
    value,
    inputRef,
    inputProps,
    inputStyle,
    handleUnCheck,
    handleOnChange,
  ]);

  return (
    <FormGroupCommon
      label={$Label}
      slotProps={{
        ...otherSlotProps,
        control: {
          maxWidth: "28px",
          alignItems: "center",
          pt: 0,
          ...controlProps,
        },
        label: {
          pl: 1,
          width: "calc(100% - 28px)",
          display: "flex",
          ...labelRootProps,
        },
      }}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "flex-start",
        ...sx,
      }}
      {...formControlProps}
      error={error}
    >
      {$Control}
    </FormGroupCommon>
  );
}

type RHFRadioWithLabelProps = RHFInputProps &
  Omit<
    RadioWithLabelProps,
    "checked" | "error" | "onChange" | "value" | "name"
  >;

function RHFRadioWithLabelBase(props: RHFRadioWithLabelProps) {
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
      <RadioWithLabel
        label={label}
        name={name}
        value={!!value}
        checked={value === true}
        defaultValue={defaultValue ?? undefined}
        {...otherProps}
        // @ts-ignore
        onChange={(_, checked) => {
          onChange(checked);
        }}
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

const rootSx: MuiSx = {
  padding: (theme) => theme.spacing(0.5),
  borderRadius: (theme) => theme.spacing(0.5),
  border: (theme) => `1px solid ${theme.palette.grey[400]}`,
};

function withCommonStyle<P extends RadioWithLabelProps = RadioWithLabelProps>(
  WrappedComponent: ComponentType<P>,
  displayName?: string
) {
  const CompositedComponent = forwardRef<unknown, P>(
    ({ sx, ...otherProps }, ref) => {
      return (
        <WrappedComponent
          sx={{ ...rootSx, ...sx }}
          {...(otherProps as any)}
          ref={ref as any}
        />
      );
    }
  );
  CompositedComponent.displayName = displayName;
  return CompositedComponent;
}

const RadioWithLabel = withCommonStyle(
  RadioWithLabelBase as any,
  "RadioWithLabel"
) as ComponentType<RadioWithLabelProps>;

const RHFRadioWithLabel = withCommonStyle(
  RHFRadioWithLabelBase as any,
  "RHFRadioWithLabel"
) as ComponentType<RHFRadioWithLabelProps>;

export default RadioWithLabel;
export { RadioWithLabelBase, RHFRadioWithLabel, RHFRadioWithLabelBase };
export type { RadioWithLabelProps, RHFRadioWithLabelProps };
