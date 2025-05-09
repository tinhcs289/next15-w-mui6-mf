import type { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import type { Moment } from "moment";

export type CustomPickerActionBarProps = PickersActionBarProps & {
  currentValue?: Moment | null;
  buttonOk?: string;
  buttonClear?: string;
  closeOnSelect?: boolean;
};
