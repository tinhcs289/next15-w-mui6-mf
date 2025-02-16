import type { SxProps, Theme } from "@mui/material";
import type {
  DatePickerToolbarProps,
  MobileDatePickerProps,
} from "@mui/x-date-pickers";
import type { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import type { RHFInputProps } from "@shared/types-react/rhf";
import type { Moment } from "moment";
import type { ReactNode } from "react";
import type { InputTextProps } from "../InputText";

export type InputDatePickerProps = MobileDatePickerProps<Moment> & {
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

export type CustomToolbarProps = DatePickerToolbarProps<Moment> & {
  label?: string;
};

export type RHFDatePickerProps = RHFInputProps & {
  defaultValue?: Moment;
} & InputDatePickerProps;
