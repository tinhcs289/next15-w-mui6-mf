import type { Grid2Props as GridProps } from "@mui/material/Grid2";
import type { MutableRefObject } from "react";
import { useForm, useFormContext as useRHFContext } from "react-hook-form";

export type Any = { [x: string]: any };

export type FormType =
  | "creation"
  | "edits"
  | "readonly"
  | "viewonly"
  | "search-filter";

export type FormSubmitCallback<Values extends Any = Any> = (
  values: Partial<Values>,
  reason?: string
) => void;

type UseFormParams<Values extends Any = Any> = Partial<
  Parameters<typeof useForm<Values>>[0]
>;

export type FormProps<
  RootComponentProps extends Any = Any,
  Values extends Any = Any,
> = Partial<RootComponentProps> & {
  /**
   * @default "edits"
   */
  formType?: FormType;
  fieldNamePrefix?: string;
  values?: Partial<Values>;
  defaultValues?: Partial<Values>;
  onSubmitForm?: FormSubmitCallback<Values>;
  formOptions?: UseFormParams<Values>;
};

export type UseFormContextReturns<Values extends Any = Any> = ReturnType<
  typeof useRHFContext<Values>
> & {
  formType?: FormType;
  fieldNamePrefix?: string;
  formRef?: MutableRefObject<HTMLFormElement | undefined>;
  submitReasonRef?: string;
  dispatchSubmit?: (reason?: string) => void;
};

export type FormGridProps<Values extends Any = Any> = FormProps<
  GridProps<"form">,
  Values
>;
