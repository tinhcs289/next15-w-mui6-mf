"use client";

import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as React from "react";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

function ForgotPasswordDialog({ open, handleClose }: ForgotPasswordProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function LinkForgotPassword() {
  const theme = useTheme(); 

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <ForgotPasswordDialog open={open} handleClose={handleClose} />
    </>
  );
}