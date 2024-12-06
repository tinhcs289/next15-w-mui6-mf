"use client";

import type { AnyObject as Any } from "@repo/types/common";
import { usePrevious } from "@uidotdev/usehooks";
import isEqual from "lodash/isEqual";
import { useCallback, useEffect, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import { useFormContext as useRHFContext } from "react-hook-form";
import { UseFormContextReturns } from "./base.types";

export const DEFAULT_SUBMIT_REASON = 'main-action';

export function useFormRef() {
  const formRef = useRef<HTMLFormElement>(null);

  const submitReasonRef = useRef<string | null | undefined>(DEFAULT_SUBMIT_REASON);

  const dispatchSubmit = useCallback((reason?: string) => {
    if (!formRef?.current?.dispatchEvent) return;

    const CustomFormSubmitEvent = new Event("submit", {
      cancelable: true,
      bubbles: true,
    });

    submitReasonRef.current = reason || "default";
    formRef.current.dispatchEvent(CustomFormSubmitEvent);
  }, []);

  return { formRef, submitReasonRef, dispatchSubmit };
}

export function ValuesInitializer<T extends FieldValues = FieldValues>({
  values,
  defaultValues,
}: {
  values?: Partial<T>;
  defaultValues?: Partial<T>;
}) {
  const preValues = usePrevious(values);
  const preDefaultValues = usePrevious(defaultValues);
  const { reset, getValues } = useRHFContext<T>();

  useEffect(
    function updateFormValuesWhenDefaultValuesPropChanges() {
      setTimeout(() => {
        if (isEqual(defaultValues, preDefaultValues)) return;
        const currentValues = getValues();
        if (isEqual(defaultValues, currentValues)) return;
        const newValues = { ...defaultValues, ...currentValues };
        reset(newValues);
      }, 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultValues]
  );

  useEffect(
    function updateFormValuesWhenValuesPropChanges() {
      setTimeout(() => {
        if (isEqual(values, preValues)) return;
        const currentValues = getValues();
        if (isEqual(values, currentValues)) return;
        const newValues = { ...currentValues, ...values };
        reset(newValues);
      }, 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values]
  );

  return <></>;
}

export function useFormContext<Values extends Any = Any>() {
  return useRHFContext() as unknown as UseFormContextReturns<Values>;
}