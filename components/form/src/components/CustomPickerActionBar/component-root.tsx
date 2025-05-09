"use client";

import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { usePickerContext } from "@mui/x-date-pickers";
import type { Moment } from "moment";
import type { MouseEventHandler, PropsWithChildren } from "react";
import { useCallback, useMemo } from "react";
import type { CustomPickerActionBarProps } from "./types";

function ButtonClear({ children }: PropsWithChildren) {
  const { clearValue, setOpen } = usePickerContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      clearValue();
      setOpen(false);
    },
    [clearValue, setOpen]
  );

  return (
    <Button color="error" onClick={handleClick} sx={{ textTransform: "none" }}>
      {children}
    </Button>
  );
}

function ButtonOk({
  children,
  currentValue = null,
}: PropsWithChildren<{
  currentValue?: Moment | null;
  previousValue?: Moment | null;
}>) {
  const { setOpen, setValue } = usePickerContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      setOpen(false);
      setValue(currentValue);
    },
    [setOpen, setValue]
  );

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleClick}
      sx={{ textTransform: "none" }}
    >
      {children}
    </Button>
  );
}

const DialogActionsStyled = styled(DialogActions)({
  display: "flex",
  justifyContent: "space-between",
});
DialogActionsStyled.displayName = "DialogActionsStyled";

export default function CustomPickerActionBar({
  actions,
  buttonOk,
  buttonClear,
  closeOnSelect = false,
  currentValue = null,
  ...props
}: CustomPickerActionBarProps) {
  const $ButtonClear = useMemo(() => {
    if (!buttonClear) return null;
    return <ButtonClear>{buttonClear}</ButtonClear>;
  }, [buttonClear]);

  const $ButtonOk = useMemo(() => {
    if (!buttonOk || closeOnSelect) return null;
    return (
      <ButtonOk currentValue={currentValue}>
        {buttonOk}
      </ButtonOk>
    );
  }, [buttonOk, closeOnSelect, currentValue]);

  return (
    <DialogActionsStyled {...props}>
      {$ButtonClear}
      {$ButtonOk}
    </DialogActionsStyled>
  );
}
