import type { ValidationRule } from "react-hook-form";

const patternedRule = (
  value: RegExp,
  message: string
): { pattern: ValidationRule<RegExp> } => ({
  pattern: { value, message },
});

export const rules = {
  required: (
    message: string
  ): { required: string | ValidationRule<boolean> } => ({
    required: { value: true, message },
  }),
  min: (
    value: number,
    message: string
  ): { min: ValidationRule<number | string> } => ({
    min: { value, message: message },
  }),
  minLength: (
    value: number,
    message: string
  ): { minLength: ValidationRule<number> } => ({
    minLength: { value, message },
  }),
  max: (
    value: number,
    message: string
  ): { max: ValidationRule<number | string> } => ({
    max: { value, message: message },
  }),
  maxLength: (
    value: number,
    message: string
  ): { maxLength: ValidationRule<number> } => ({
    maxLength: { value, message },
  }),
  pattern: patternedRule,
  shouldBeEmail: (message: string) =>
    patternedRule(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message),
  shouldBePhoneNumber: (message: string) =>
    patternedRule(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/im, message),
  shouldBeUrl: (message: string) =>
    patternedRule(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      message
    ),
  shouldSlugified: (message: string) =>
    patternedRule(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, message),
};
