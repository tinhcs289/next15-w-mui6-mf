import type { DialogProps } from "@mui/material/Dialog";
import type { DialogActionsProps } from "@mui/material/DialogActions";
import type { DialogContentProps } from "@mui/material/DialogContent";
import type { DialogTitleProps } from "@mui/material/DialogTitle";
import type { GridProps } from "@mui/material/Grid";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { TypographyProps } from "@mui/material/Typography";
import type { ComponentType, FormEventHandler } from "react";
import { SlideTypeEnum } from "./enums";

export type SlideType = `${SlideTypeEnum}`;

export type SlotProps = {
  dialog: Omit<DialogProps, "open" | "onSubmit" | "onClose"> & {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    slide?: SlideType;
    closeWhenClickAway?: boolean;
  };
  title: DialogTitleProps;
  titleText: TypographyProps;
  closeButton: IconButtonProps;
  content: DialogContentProps & {
    contentProps?: Partial<GridProps>;
  };
  actions: DialogActionsProps & {
    contentProps?: Partial<GridProps>;
  };
};

export type Slot = {
  dialog: ComponentType<SlotProps["dialog"]>;
  title: ComponentType<SlotProps["title"]>;
  titleText: ComponentType<SlotProps["titleText"]>;
  closeButton: ComponentType<SlotProps["closeButton"]>;
  content: ComponentType<SlotProps["content"]>;
  actions: ComponentType<SlotProps["actions"]>;
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

export type DialogStates<CallbackData extends Any = Any> = {
  open?: boolean;
  loading?: boolean;
  closeDialog?: DialogOnClose<CallbackData>;
};
