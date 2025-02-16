"use client";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import type { RHFInputProps, RHFRenderInput } from "@shared/types-react/rhf";
import cloneDeep from "lodash/cloneDeep";
import type { Moment } from "moment";
import moment from "moment";
import { ComponentType, forwardRef, Ref, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import InputText from "../InputText";
import CustomPickerActionBar from "./components/CustomPickerActionBar";
import CustomToolbar from "./components/CustomToolbar";
import { DEFAULT_FORMAT } from "./constants";
import type { InputDatePickerProps } from "./types";


export const InputDatePicker = forwardRef<HTMLDivElement, InputDatePickerProps>(({
  format,
  error,
  errorText,
  placeholder,
  sx,
  value,
  required,
  slotProps,
  slots,
  TextFieldProps,
  buttonOk,
  buttonClear,
  buttonNegative,
  closeOnSelect,
  clearable = true,
  label,
  onChange,
  ...otherProps
}, ref) => {
  const $ButtonClearValue = useMemo(
    () =>
      !clearable || !value ? null : (
        <IconButton
          size="small"
          onClick={(e) => {
            e?.stopPropagation?.();
            e?.preventDefault?.();
            // @ts-ignore
            onChange?.(null);
          }}
        >
          <CloseIcon />
        </IconButton>
      ),
    [clearable, value, onChange]
  );

  return (
    <MobileDatePicker
      format={format || DEFAULT_FORMAT}
      dayOfWeekFormatter={(d) => d.format("ddd")}
      {...otherProps}
      onChange={onChange}
      value={value}
      label={label}
      closeOnSelect={!!closeOnSelect}
      slots={{
        toolbar: CustomToolbar,
        actionBar: CustomPickerActionBar,
        textField: InputText as any,
        ...slots,
      }}
      slotProps={{
        ...slotProps,
        actionBar: {
          buttonOk,
          buttonClear,
          buttonNegative,
          closeOnSelect,
          ...slotProps?.actionBar,
        } as any,
        toolbar: {
          label: label || "",
        } as any,
        textField(ownerState) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { slots: _, slotProps: __, ...state } = ownerState;
          return {
            ...state,
            ...TextFieldProps,
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  {$ButtonClearValue}
                  <CalendarMonthIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </InputAdornment>
              ),
              ...TextFieldProps?.InputProps,
            },
            sx,
            placeholder:
              placeholder || TextFieldProps?.placeholder || undefined,
            error,
            errorText,
            required,
          } as any;
        },
      }}
      ref={ref}
    />
  );
}) as ComponentType<InputDatePickerProps & { ref?: Ref<HTMLDivElement> }>;
InputDatePicker.displayName = "InputDatePicker";


export type RHFDatePickerProps = RHFInputProps & {
  defaultValue?: Moment;
} & InputDatePickerProps;

export function RHFDatePicker({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister = false,
  ...otherProps
}: RHFDatePickerProps) {
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onChange, value: _value, ref },
      fieldState: { invalid, error },
    }) => {
      const inputProps: { [x: string]: any } = { ...otherProps };
      if (!!rules?.required) inputProps.required = true;
      if (!!error?.message) inputProps.errorText = error.message;
      const value = moment.isMoment(_value) ? moment(cloneDeep(_value)) : null;
      return (
        <InputDatePicker
          {...inputProps}
          value={value}
          onChange={(date?: Moment | null) => {
            const newDate =
              !!date && moment.isMoment(date) ? moment(cloneDeep(date)) : null;
            onChange(newDate);
          }}
          inputRef={ref}
          error={invalid}
        />
      );
    },
    [rules?.required, otherProps]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? undefined}
      shouldUnregister={shouldUnregister}
      render={renderInput}
    />
  );
}
