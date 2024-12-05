"use client";

import { usePrevious } from "@uidotdev/usehooks";
import isEqual from "lodash/isEqual";
import { useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

export type RHFValuesInitializerProps<T extends FieldValues = FieldValues> = {
  values?: Partial<T>;
  defaultValues?: Partial<T>;
};

export default function RHFValuesInitializer<T extends FieldValues = FieldValues>(
  props: RHFValuesInitializerProps<T>
) {
  const { values, defaultValues } = props;

  const preValues = usePrevious(values);

  const preDefaultValues = usePrevious(defaultValues);

  const { reset, getValues } = useFormContext<T>();

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