"use client";

import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import formatMoment from "@shared/utils/moment/formatMoment";
import moment from "moment";
import { useMemo } from "react";
import { DEFAULT_FORMAT } from "../constants";
import type { CustomToolbarProps } from "../types";

export default function CustomToolbar({
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
