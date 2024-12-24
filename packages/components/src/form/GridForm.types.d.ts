import type { Grid2Props as GridProps } from "@mui/material/Grid2";
import type { AnyObject as Any } from "@repo/types/common";
import type { FormProps } from "./base.types";

export type GridFormProps<Values extends Any = Any> = FormProps<GridProps<"form">, Values>;