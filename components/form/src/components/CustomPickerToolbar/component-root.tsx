"use client";

import DialogTitle from "@mui/material/DialogTitle";
import type { DialogTitleProps } from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography";
import formatMoment from "@shared/utils/moment/formatMoment";
import moment from "moment";
import { useMemo } from "react";
import type { CustomPickerToolbarProps } from "./types";

export default function CustomPickerToolbar({
  label,
  value,
  toolbarFormat,
  titleId,
  ampmInClock,
  ampm,
  ...otherProps
}: CustomPickerToolbarProps) {
  const $DateText = useMemo(() => {
    if (!value || !moment(value).isValid())
      return (
        <Typography variant="h6" color="GrayText" sx={{ opacity: 0.3 }}>
          {toolbarFormat || ""}
        </Typography>
      );

    if (!toolbarFormat)
      return <Typography variant="h6">{moment(value).toString()}</Typography>;

    return <Typography variant="h6">{formatMoment(value, toolbarFormat)}</Typography>;
  }, [value, toolbarFormat]);

  return (
    <DialogTitle component="div" {...(otherProps as DialogTitleProps)}>
      <Typography color="GrayText">{label}</Typography>
      {$DateText}
    </DialogTitle>
  );
}
