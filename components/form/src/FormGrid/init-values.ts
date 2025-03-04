"use client";

import { usePrevious } from "@uidotdev/usehooks";
import isEqual from "lodash/isEqual";
import type { JSX } from "react";
import { useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import { useFormContext as useRHFContext } from "react-hook-form";

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

  return null as unknown as JSX.Element;
}
