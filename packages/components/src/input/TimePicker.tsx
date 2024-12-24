"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, type SxProps, type Theme } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import type {
  MobileTimePickerProps,
  TimePickerToolbarProps,
} from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import type { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import formatMoment from "@repo/utils/moment/formatMoment";
import cloneDeep from "lodash/cloneDeep";
import type { Moment } from "moment";
import moment from "moment";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type { RHFInputProps, RHFRenderInput } from "@repo/types-react/rhf";
import type { TextProps } from "./Text";
import Text from "./Text";

const DEFAULT_FORMAT = "HH:mm";

export type TimePickerProps = MobileTimePickerProps<Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  TextFieldProps?: Partial<TextProps>;
  buttonOk?: string;
  buttonClear?: string;
  buttonNegative?: string;
  required?: boolean;
  clearable?: boolean;
  sx?: SxProps<Theme>;
};

export type CustomPickerActionBarProps = PickersActionBarProps & {
  buttonOk?: string;
  buttonClear?: string;
  buttonNegative?: string;
  closeOnSelect?: boolean;
};

function CustomPickerActionBar({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actions,
  onAccept,
  onClear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCancel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetToday,
  sx,
  buttonOk,
  buttonClear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buttonNegative,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closeOnSelect,
  ...props
}: CustomPickerActionBarProps) {
  const $ButtonClear = useMemo(() => {
    if (!buttonClear) return null;
    return (
      <Button color="error" onClick={onClear} sx={{ textTransform: "none" }}>
        {buttonClear}
      </Button>
    );
  }, [buttonClear, onClear]);

  const $ButtonOk = useMemo(() => {
    if (!buttonOk || !!closeOnSelect) return null;
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={onAccept}
        sx={{ textTransform: "none" }}
      >
        {buttonOk}
      </Button>
    );
  }, [buttonOk, closeOnSelect, onAccept]);

  // const __ButtonNegative = useMemo(() => {
  //   if (!buttonNegative) return null;
  //   return (
  //     <Button onClick={onCancel} sx={{ textTransform: "none" }}>
  //       {buttonNegative}
  //     </Button>
  //   );
  // }, [buttonNegative, onCancel]);

  return (
    <DialogActions
      sx={{ display: "flex", justifyContent: "space-between", ...sx }}
      {...props}
    >
      {$ButtonClear}
      {$ButtonOk}
      {/* {$ButtonNegative}  */}
    </DialogActions>
  );
}

export type CustomToolbarProps = TimePickerToolbarProps<Moment> & {
  label?: string;
};

function CustomToolbar({
  label,
  value,
  toolbarFormat,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onViewChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  titleId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isLandscape,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ampmInClock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ampm,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  views,
  ...props
}: CustomToolbarProps) {
  const $DateText = useMemo(() => {
    if (!value || !moment(value).isValid())
      return (
        <Typography variant="h6" color="GrayText" sx={{ opacity: 0.3 }}>
          {DEFAULT_FORMAT}
        </Typography>
      );
    const text = formatMoment(value, toolbarFormat || DEFAULT_FORMAT);
    return <Typography variant="h6">{text}</Typography>;
  }, [value, toolbarFormat]);

  return (
    <DialogTitle component="div" {...(props as any)}>
      <Typography color="GrayText">{label}</Typography>
      {$DateText}
    </DialogTitle>
  );
}

export default function TimePicker({
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
}: TimePickerProps) {
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
    <MobileTimePicker
      format={format || DEFAULT_FORMAT}
      {...otherProps}
      onChange={onChange}
      value={value}
      label={label}
      closeOnSelect={!!closeOnSelect}
      slots={{
        toolbar: CustomToolbar,
        actionBar: CustomPickerActionBar,
        textField: Text as any,
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
                  <AccessTimeIcon
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
    />
  );
}

export type RHFTimePickerProps = RHFInputProps & {
  defaultValue?: Moment;
} & TimePickerProps;

export function RHFTimePicker({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister = false,
  ...otherProps
}: RHFTimePickerProps) {
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
        <TimePicker
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
