"use client";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import type { ComponentType } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import InputError from "../InputError";
import type { RHFRenderInput } from "../types";
import TextFieldStyled from "./components/TextFieldStyled";
import { textClasses } from "./constants";
import type { InputTextProps, RHFTextProps } from "./types";

export const InputText = forwardRef<HTMLDivElement, InputTextProps>(
  function ForwardRef(props, ref) {
    const {
      errorText,
      error,
      variant = "outlined",
      inputProps,
      InputProps,
      StyledComponent = TextFieldStyled,
      onFocus,
      onBlur,
      InputLabelProps,
      className,
      label,
      size = "small",
      ...otherProps
    } = props;

    const [focused, setFocused] = useState(false);

    const handleFocus: Required<InputTextProps>["onFocus"] = useCallback(
      (e) => {
        setTimeout(() => {
          setFocused(true);
        }, 0);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleOutFocus: Required<InputTextProps>["onBlur"] = useCallback(
      (e) => {
        setTimeout(() => {
          setFocused(false);
        }, 0);
        onBlur?.(e);
      },
      [onBlur]
    );

    const memoInputLabelProps: Required<InputTextProps>["InputLabelProps"] =
      useMemo(() => {
        return {
          ...(InputLabelProps as any),
          shrink:
            typeof InputLabelProps?.shrink === "boolean"
              ? Boolean(InputLabelProps.shrink)
              : !!(focused || props?.placeholder || props?.value),
        };
      }, [InputLabelProps, focused, props?.value, props?.placeholder]);

    const memoClassName = useMemo(() => {
      let cls = className || "";
      if (InputProps?.startAdornment)
        cls = `${textClasses.hasStartIcon} ${cls}`;
      if (props?.multiline) cls = `${textClasses.textarea} ${cls}`;
      if (variant === "bootstrap") cls = `${textClasses.bootstrap} ${cls}`;
      return cls;
    }, [className, variant, props?.multiline, InputProps?.startAdornment]);

    if (variant !== "bootstrap") {
      return (
        <StyledComponent
          size={size}
          margin="none"
          color="primary"
          fullWidth
          {...otherProps}
          inputProps={{ ...inputProps, notched: `${!!inputProps?.notched}` }}
          InputLabelProps={memoInputLabelProps}
          InputProps={{
            ...InputProps,
            ...(error === true && !!errorText
              ? {
                  endAdornment: (
                    <>
                      {InputProps?.endAdornment}
                      <InputAdornment position="end">
                        <InputError>{errorText}</InputError>
                      </InputAdornment>
                    </>
                  ),
                }
              : {}),
          }}
          label={label}
          error={!!error}
          className={memoClassName}
          onFocus={handleFocus}
          onBlur={handleOutFocus}
          ref={ref}
        />
      );
    }

    return (
      <FormControl
        required={!!otherProps?.required}
        error={error}
        size={size}
        fullWidth
      >
        <FormLabel sx={{ fontWeight: 600, mb: "4px" }}>{label}</FormLabel>
        <StyledComponent
          size={size}
          margin="none"
          color="primary"
          fullWidth
          inputProps={{ ...inputProps, notched: `${!!inputProps?.notched}` }}
          InputLabelProps={memoInputLabelProps}
          InputProps={{
            ...InputProps,
            ...(error === true && !!errorText
              ? {
                  endAdornment: (
                    <>
                      {InputProps?.endAdornment}
                      <InputAdornment position="end">
                        <InputError>{errorText}</InputError>
                      </InputAdornment>
                    </>
                  ),
                }
              : {}),
          }}
          {...otherProps}
          error={!!error}
          className={memoClassName}
          onFocus={handleFocus}
          onBlur={handleOutFocus}
          ref={ref}
          variant="outlined"
        />
      </FormControl>
    );
  }
) as ComponentType<InputTextProps>;
InputText.displayName = "InputText";

export function RHFText(props: RHFTextProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    ...inputProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, ref },
      fieldState: { invalid, error },
    }) => (
      <InputText
        name={name as string}
        value={value || ""}
        {...(defaultValue ? { defaultValue } : {})}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        {...inputProps}
        required={!!rules?.required}
        errorText={error?.message ?? undefined}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, rules?.required, inputProps, defaultValue]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      {...(typeof shouldUnregister === "boolean" ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
