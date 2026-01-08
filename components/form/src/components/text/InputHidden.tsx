"use client";

import type { DOMAttributes, InputHTMLAttributes, RefObject } from "react";
import { ComponentType, forwardRef } from "react";

export type InputHiddenProps = DOMAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> & { ref?: RefObject<HTMLInputElement> };

const InputHidden = forwardRef<HTMLInputElement, InputHiddenProps>(
  (props, ref) => {
    return <input {...props} type="hidden" ref={ref} />;
  }
) as ComponentType<InputHiddenProps>;
InputHidden.displayName = "InputHidden";

export default InputHidden;