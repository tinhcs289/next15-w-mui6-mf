import type { SxProps, Theme } from "@mui/material";
import type { MobileDatePickerProps } from "@mui/x-date-pickers";
import type { Moment } from "moment";
import type { ReactNode } from "react";
import type { InputTextProps } from "../InputText";
import type { RHFInputProps } from "../../types";

export type InputDatePickerProps = Omit<MobileDatePickerProps<false>, "value" | "defaultValue" | "onChange"> & {
  value?: Moment | null;
  defaultValue?: Moment | null;
  onChange?: (date?: Moment | null) => void;
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

export type RHFDatePickerProps = RHFInputProps & {
  defaultValue?: Moment;
} & InputDatePickerProps;
