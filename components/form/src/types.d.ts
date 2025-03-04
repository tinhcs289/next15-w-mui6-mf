import type { ReactElement } from "react";
import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn,
} from "react-hook-form";

export type AnyObject = { [x: string]: any };

export type RHFRules = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type RHFRuleValidate = Required<RHFRules>["validate"];

export type RHFInputProps<ExtendProps extends AnyObject = AnyObject> = {
  name: string;
  control: Control<any, any>;
  /**
   * exclude this field value from form values if be not mounted or not displayed
   */
  shouldUnregister?: boolean;
  rules?: RHFRules;
} & ExtendProps;

export type RHFRenderInputArgs = {
  field: ControllerRenderProps<FieldValues, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};

export type RHFRenderInput = (args: RHFRenderInputArgs) => ReactElement<any>;

export type Option<T extends AnyObject = AnyObject> = T & {
  label: string;
  value: string;
  disabled?: boolean;
  childrens?: Option<T>[];
};

export type Tag<T extends AnyObject = AnyObject> = T & {
  value: string;
  label: string;
  disabled?: boolean;
};
