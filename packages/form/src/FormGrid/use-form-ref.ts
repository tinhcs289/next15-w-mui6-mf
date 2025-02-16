"use client";

import { useCallback, useRef } from "react";
import { DEFAULT_SUBMIT_REASON } from "./constants";

export function useFormRef() {
  const formRef = useRef<HTMLFormElement>(null);

  const submitReasonRef = useRef<string | null | undefined>(
    DEFAULT_SUBMIT_REASON
  );

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
