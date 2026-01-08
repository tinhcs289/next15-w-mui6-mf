"use client";

import type { RefObject } from "react";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import type { RHFControlledInputProps } from "../../types";
import type { InputHiddenProps } from "./InputHidden";
import InputHidden from "./InputHidden";

export type RHFHiddenProps = RHFControlledInputProps<InputHiddenProps>;

const RHFHidden = forwardRef<HTMLInputElement, RHFHiddenProps>(
  ({ control, name, rules, shouldUnregister, ...otherProps }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputHidden
            {...otherProps}
            {...field}
            ref={ref as RefObject<HTMLInputElement>}
          />
        )}
        rules={rules}
        shouldUnregister={shouldUnregister}
      />
    );
  }
);
RHFHidden.displayName = "RHFHidden";

export default RHFHidden;

