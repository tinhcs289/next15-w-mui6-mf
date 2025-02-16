"use client";

import { styled } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  dialogClasses as classes,
  default as MuiDialog,
} from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import type { Slot, SlotProps } from "./types";

const S = {
  Dialog: styled(MuiDialog)<SlotProps["dialog"]>(({ theme }) => ({
    [`&.${classes.root}`]: {
      [`& > .${classes.container}`]: {
        [`& > .${classes.paper}`]: {
          [`&:not(.${classes.paperFullScreen})`]: {
            borderRadius: theme.spacing(1.5),
          },
          minWidth: theme.spacing(65),
          position: "relative",
          backgroundRepeat: "none",
          backgroundPosition: "center",
        },
      },
    },
  })) as Slot["dialog"],
  Title: styled(DialogTitle)<SlotProps["title"]>(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  })) as Slot["title"],
  TitleText: styled(Typography)<SlotProps["titleLabel"]>(({ theme }) => ({
    fontWeight: 500,
    fontSize: theme.spacing(2.5),
    lineHeight: theme.spacing(4),
    color: theme.palette.primary.main,
  })) as Slot["titleLabel"],
  Content: styled(DialogContent)<SlotProps["content"]>(({ theme }) => ({
    padding: theme.spacing(5),
  })) as Slot["content"],
  Actions: styled(DialogActions)<SlotProps["actions"]>(({ theme }) => ({
    padding: theme.spacing(5),
    paddingTop: theme.spacing(2),
  })) as Slot["actions"],
  LoadingOverlay: styled(Backdrop)<SlotProps["loading"]>(({ theme }) => ({
    zIndex: theme.zIndex.modal + 2,
    position: "absolute",
  })) as Slot["loading"],
};

S.Dialog.displayName = "Dialog:Root";
S.Title.displayName = "Dialog:Title";
S.Content.displayName = "Dialog:Content";
S.Actions.displayName = "Dialog:Actions";
S.LoadingOverlay.displayName = "Dialog:LoadingOverlay";

export default S;
