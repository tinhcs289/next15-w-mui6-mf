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

export type RHFRules = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type RHFRuleValidate = Required<RHFRules>["validate"];

export type AnyProps = { [x: string]: any };

export type AnyObject = { [x: string]: any };

type OverrideOriginProps<T, U> = Omit<T, keyof U> & U;

type RHFControlBaseProps = {
  name: string;
  control: Control<Record<string, any>, any, Record<string, any>>;
  shouldUnregister?: boolean;
  rules?: RHFRules;
};

export type RHFControlledInputProps<
  OriginProps extends Record<string, any> = Record<string, any>,
> = OverrideOriginProps<OriginProps, RHFControlBaseProps>;

export type RHFInputProps<ExtendProps extends AnyProps = AnyProps> =
  ExtendProps & {
    name: string;
    control: Control<FieldValues, AnyProps>;
    shouldUnregister?: boolean;
    rules?: RHFRules;
  };

export type RHFRenderInputArgs = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};

export type RHFRenderInput = (args: RHFRenderInputArgs) => ReactElement<any>;

export type AnyValues = { [x: string]: any };

export type Option<T extends AnyValues = AnyValues> = T & {
  label: string;
  value: string;
  disabled?: boolean;
  children?: Option<T>[];
};

export type Tag<T extends AnyValues = AnyValues> = T & {
  value: string;
  label: string;
  disabled?: boolean;
};
