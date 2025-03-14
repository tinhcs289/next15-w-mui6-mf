import FormGrid, { useFormContext } from "./components/FormGrid";
import FormGroupCommon from "./components/FormGroupCommon";

export type {
  FormGridProps,
  FormSubmitCallback,
  FormType,
  UseFormContextReturns,
} from "./components/FormGrid";

export type {
  FormGroupCommonProps,
  Slot,
  SlotProps,
} from "./components/FormGroupCommon";

export { FormGrid, FormGroupCommon, useFormContext };

export {
  max,
  maxLength,
  min,
  minLength,
  pattern,
  required,
  shouldBeEmail,
  shouldBePhoneNumber,
  shouldBeUrl,
  shouldSlugified,
} from "./rhf-rules";

export type {
  AnyObject,
  Option,
  RHFInputProps,
  RHFRenderInput,
  RHFRenderInputArgs,
  RHFRules,
  RHFRuleValidate,
  Tag,
} from "./types";
