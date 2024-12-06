"use client";

import { useCallback, useRef } from "react";

export function useFormRef() {
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * @default 'default'
   */
  const submitReasonRef = useRef<string | null | undefined>("default");

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