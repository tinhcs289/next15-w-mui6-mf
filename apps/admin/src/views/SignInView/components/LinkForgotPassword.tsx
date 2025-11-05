"use client";

import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import DialogForgotPassword from "./DialogForgotPassword";

export default function LinkForgotPassword() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        type="button"
        onClick={handleClickOpen}
        variant="text"
        size="small"
        sx={{
          position: "absolute",
          top: theme.spacing(-1),
          right: 0,
          padding: 1,
          alignSelf: "baseline",
          color: theme.palette.primary.main,
          textDecorationLine: "underline",
          ":hover": {
            textDecorationLine: "underline",
          },
        }}
      >
        Forgot your password?
      </Button>
      <DialogForgotPassword open={open} handleClose={handleClose} />
    </>
  );
}
