import type { DialogProps } from "@mui/material/Dialog";
import type { AnyObject as Any } from "@repo/types/common";
import type { FormProps } from "./base.types";

export type DialogFormProps<Values extends Any = Any> = FormProps<DialogProps, Values>;