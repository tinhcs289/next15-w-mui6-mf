"use client";

import { ComponentType, forwardRef, useCallback } from "react";
import { Controller } from "react-hook-form";
import type { RHFInputProps, RHFRenderInput } from "../types";
import type { InputHiddenProps } from "./types";

const InputHidden = forwardRef<HTMLInputElement, InputHiddenProps>((props, ref) => {
  return <input {...props} type="hidden" ref={ref} />;
}) as ComponentType<InputHiddenProps>;
InputHidden.displayName = "InputHidden";

function RHFHidden({
  control,
  name,
  rules,
  shouldUnregister = false,
}: RHFInputProps) {
  const renderInput: RHFRenderInput = useCallback(
    ({ field }) => <InputHidden {...field} />,
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

export { InputHidden, RHFHidden };

