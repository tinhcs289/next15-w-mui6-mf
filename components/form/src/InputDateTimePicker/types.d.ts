import type { SxProps, Theme } from "@mui/material";
import type {
  DateTimePickerToolbarProps,
  MobileDateTimePickerProps,
} from "@mui/x-date-pickers";
import type { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import type { Moment } from "moment";
import type { ReactNode } from "react";
import type { InputTextProps } from "../InputText";
import type { RHFInputProps } from "../types";

export type InputDateTimePickerProps = MobileDateTimePickerProps<Moment> & {
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  TextFieldProps?: Partial<InputTextProps>;
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

export type CustomToolbarProps = DateTimePickerToolbarProps<Moment> & {
  label?: string;
};

export type RHFDateTimeProps = RHFInputProps & {
  defaultValue?: Moment;
} & InputDateTimePickerProps;
