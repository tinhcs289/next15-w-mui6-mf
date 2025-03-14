import type { SxProps, Theme } from "@mui/material";
import type { MobileTimePickerProps, TimeView } from "@mui/x-date-pickers";
import type { Moment } from "moment";
import type { ReactNode } from "react";
import type { InputTextProps } from "../InputText";
import type { RHFInputProps } from "../../types";

export type InputTimePickerProps<TView extends TimeView = TimeView> = Omit<
  MobileTimePickerProps<TView, false>,
  "value" | "defaultValue" | "onChange"
> & {
  value?: Moment | null;
  defaultValue?: Moment | null;
  onChange?: (date?: Moment | null) => void;
  error?: boolean;
  errorText?: ReactNode;
  placeholder?: ReactNode;
  TextFieldProps?: Partial<InputTextProps>;
  buttonOk?: string;
  buttonClear?: string;
  required?: boolean;
  clearable?: boolean;
  sx?: SxProps<Theme>;
};

export type RHFTimePickerProps = RHFInputProps & {
  defaultValue?: Moment;
} & InputTimePickerProps;
