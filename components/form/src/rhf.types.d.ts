import type { ReactNode } from "react";
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
  RegisterOptions<Record<string, any>, FieldPath<Record<string, any>>>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type RHFRuleValidate = Required<RHFRules>["validate"];

type Override<OriginProps, OverrideProps> = Omit<
  OriginProps,
  keyof OverrideProps
> &
  OverrideProps;

type RHFControlBaseProps = {
  name: string;
  control: Control<Record<string, any>, any, Record<string, any>>;
  shouldUnregister?: boolean;
  rules?: RHFRules;
};

export type RHFControlledInputProps<
  OriginProps extends Record<string, any> = Record<string, any>,
> = Override<OriginProps, RHFControlBaseProps>;

export type RHFControlRenderInput = (args: {
  field: ControllerRenderProps<
    Record<string, any>,
    string,
    Record<string, any>
  >;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<Record<string, any>>;
}) => ReactNode;
