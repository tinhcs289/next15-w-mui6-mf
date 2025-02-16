import type { BackdropProps } from "@mui/material/Backdrop";
import type { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import type { DialogActionsProps as MuiDialogActionsProps } from "@mui/material/DialogActions";
import type { DialogContentProps as MuiDialogContentProps } from "@mui/material/DialogContent";
import type { DialogTitleProps as MuiDialogTitleProps } from "@mui/material/DialogTitle";
import type { TypographyProps } from "@mui/material/Typography";
import type { ComponentType } from "react";
import { SlideTypeEnum } from "./enums";

export type Slot = {
  dialog: ComponentType<MuiDialogProps>;
  title: ComponentType<MuiDialogTitleProps>;
  titleLabel: ComponentType<TypographyProps>;
  content: ComponentType<MuiDialogContentProps>;
  actions: ComponentType<MuiDialogActionsProps>;
  loading: ComponentType<BackdropProps>;
};

export type SlotProps = {
  dialog: MuiDialogProps;
  title: MuiDialogTitleProps;
  titleLabel: TypographyProps;
  content: MuiDialogContentProps;
  actions: MuiDialogActionsProps;
  loading: BackdropProps;
};

export type Any = { [x: string]: any };

export type DialogCloseReason =
  | "after_submit_successful"
  | "click_outside"
  | "force_close";

export type DialogCloseParams<CallbackData extends Any = Any> = {
  reason: DialogCloseReason;
  data?: CallbackData;
};

export type DialogOnClose<CallbackData extends Any = Any> = (
  params: DialogCloseParams<CallbackData>
) => void;

export type SlideType = `${SlideTypeEnum}`;

export type DialogStates = {
  loading?: boolean;
  onClose?: DialogOnClose;
};
