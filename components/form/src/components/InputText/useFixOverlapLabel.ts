"use client";

import type { FocusEvent } from "react";
import { useCallback, useMemo, useState } from "react";

const calcShrink = ({
  inputLabelProps,
  focused,
  placeholder,
  value,
}: {
  inputLabelProps?: any;
  focused: boolean;
  placeholder?: string;
  value?: any;
}) => {
  const forced =
    typeof inputLabelProps?.shrink === "boolean"
      ? inputLabelProps.shrink
      : undefined;

  if (typeof forced === "boolean") return forced;

  return Boolean(
    focused || (placeholder?.length ?? 0) > 0 || (value?.length ?? 0) > 0
  );
};

type FocusHandler = (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

// this will avoid label overlap issue
const useFixOverlapLabel = ({
  onFocus,
  onBlur,
  inputLabelProps,
  placeholder,
  value,
  defaultValue,
}: {
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  inputLabelProps?: object | ((ownerState: any) => object);
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus: FocusHandler = useCallback(
    (...args) => {
      setFocused(true);
      onFocus?.(...args);
    },
    [onFocus]
  );

  const handleOutFocus: FocusHandler = useCallback(
    (...args) => {
      setFocused(false);
      onBlur?.(...args);
    },
    [onBlur]
  );

  const shrink = useMemo(
    () =>
      calcShrink({
        focused,
        placeholder: placeholder,
        value: value ?? defaultValue,
        inputLabelProps,
      }),
    [focused, inputLabelProps, placeholder, value, defaultValue]
  );

  const getInputLabelProps = useCallback(
    (ownerState: any) => {
      let props = { shrink };
      if (typeof inputLabelProps === "function") {
        props = { ...inputLabelProps(ownerState), shrink };
      }
      if (typeof inputLabelProps === "object") {
        props = { ...inputLabelProps, shrink };
      }
      return props;
    },
    [shrink, inputLabelProps]
  );

  return { focused, handleFocus, handleOutFocus, getInputLabelProps };
};

export default useFixOverlapLabel;
