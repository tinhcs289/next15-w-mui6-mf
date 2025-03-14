import type { DateTimePickerToolbarProps } from "@mui/x-date-pickers";
import { Moment } from "moment";

export type CustomPickerToolbarProps = DateTimePickerToolbarProps & {
  label?: string;
  value?: Moment | null;
};
