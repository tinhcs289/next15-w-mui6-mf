"use client";

import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import Button from "@mui/material/Button";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import type { Moment } from "moment";
import moment from "moment";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface ButtonFieldProps
  extends UseDateFieldProps<Moment, false>,
    BaseSingleInputFieldProps<
      Moment | null,
      Moment,
      FieldSection,
      false,
      DateValidationError
    > {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content" }}
    >
      {label ? `${label}` : "Pick a date"}
    </Button>
  );
}

export default function CustomDatePicker() {
  const [value, setValue] = useState<Moment | null>(moment("2023-04-17"));
  const [open, setOpen] = useState(false);

  return (
    <DatePicker
      value={value}
      label={value == null ? null : value.format("MMM DD, YYYY")}
      onChange={(newValue) => setValue(newValue)}
      slots={{ field: ButtonField }}
      slotProps={{
        field: { setOpen } as any,
        nextIconButton: { size: "small" },
        previousIconButton: { size: "small" },
      }}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      views={["day", "month", "year"]}
    />
  );
}
