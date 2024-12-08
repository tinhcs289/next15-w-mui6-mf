"use client";

import { useCallback } from "react";
import { Controller } from "react-hook-form";
import type { RHFInputProps, RHFRenderInput } from "../../types/rhf";

type RHFHiddenProps = RHFInputProps;

function RHFHidden({
  control,
  name,
  rules,
  shouldUnregister = false,
}: RHFInputProps) {
  const renderInput: RHFRenderInput = useCallback(
    ({ field }) => <input {...field} type="hidden" />,
    []
  );
  return (
    <Controller
      name={name}
      control={control}
      render={renderInput}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
}

export { RHFHidden };
export type { RHFHiddenProps };
