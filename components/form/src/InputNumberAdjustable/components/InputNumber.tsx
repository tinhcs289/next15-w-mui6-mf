"use client";

import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import type { ChangeEvent, ComponentType } from "react";
import { useCallback, useMemo } from "react";
import type {
  InputAttributes,
  NumberFormatValues,
  SourceInfo
} from "react-number-format";
import { NumericFormat } from "react-number-format";
import type { InputNumberProps } from "../types";

const isAllowedDefault = (values: NumberFormatValues) =>
  values?.value?.length <= 16 || values?.value === "";

export default function InputNumber({
  isAllowed,
  onValueChange,
  onChange,
  ...otherProps
}: InputNumberProps) {
  const handleValueChangeDelay = useMemo(() => {
    return debounce((values: NumberFormatValues, sourceInfo: SourceInfo) => {
      onValueChange?.(values, sourceInfo);
    }, 300);
  }, [onValueChange]);

  const handleChangeDelay = useMemo(() => {
    return debounce((e: ChangeEvent<any>) => {
      onChange?.(e);
    }, 300);
  }, [onChange]);

  const isAllowedMemo = useCallback(
    (values: NumberFormatValues) => {
      if (typeof isAllowed !== "function") return isAllowedDefault(values);
      return isAllowedDefault(values) && isAllowed(values) === true;
    },
    [isAllowed]
  );
  return (
    <NumericFormat
      customInput={TextField as ComponentType<InputAttributes>}
      allowNegative
      allowLeadingZeros={false}
      decimalSeparator="."
      thousandSeparator=","
      isAllowed={isAllowedMemo}
      {...otherProps}
      onChange={handleChangeDelay}
      onValueChange={handleValueChangeDelay}
    />
  );
}
