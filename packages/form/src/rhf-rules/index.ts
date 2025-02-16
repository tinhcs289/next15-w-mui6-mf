/* eslint-disable no-useless-escape */

import type { ValidationRule } from "react-hook-form";

export const required = (
  message: string
): { required: string | ValidationRule<boolean> } => ({
  required: { value: true, message },
});
export const min = (
  value: number,
  message: string
): { min: ValidationRule<number | string> } => ({
  min: { value, message: message },
});
export const max = (
  value: number,
  message: string
): { max: ValidationRule<number | string> } => ({
  max: { value, message: message },
});
export const minLength = (
  value: number,
  message: string
): { minLength: ValidationRule<number> } => ({
  minLength: { value, message },
});
export const maxLength = (
  value: number,
  message: string
): { maxLength: ValidationRule<number> } => ({
  maxLength: { value, message },
});
export const pattern = (
  value: RegExp,
  message: string
): { pattern: ValidationRule<RegExp> } => ({
  pattern: { value, message },
});

const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const REGEX_PHONE = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/im;
const REGEX_SLUGIFY = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REGEXT_URL =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const shouldBeEmail = (message: string) => pattern(REGEX_EMAIL, message);
export const shouldBePhoneNumber = (message: string) => pattern(REGEX_PHONE, message);
export const shouldBeUrl = (message: string) => pattern(REGEXT_URL, message);
export const shouldSlugified = (message: string) => pattern(REGEX_SLUGIFY, message);
