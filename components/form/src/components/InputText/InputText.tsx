"use client";

import type { ComponentType, ForwardedRef, JSX } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import mergeClasses from "../../helpers/mergeClasses";
import FormControlWrapper from "./FormControlWrapper";
import TextFieldStyled from "./TextFieldStyled";
import textInputClasses from "./textInputClasses";
import type {
  InputTextProps,
  MuiTextFieldProps,
  TextInputVariants,
} from "./types";
import useFixOverlapLabel from "./useFixOverlapLabel";

const InputText = forwardRef(
  <V extends TextInputVariants>(
    {
      errorText,
      helperText,
      error = false,
      required = false,
      size = "small",
      label: labelProp,
      className: classNameProp,
      variant: variantProp = "standard" as V,
      StyledComponent = TextFieldStyled,
      onFocus,
      onBlur,
      slotProps,
      inputRef,
      ...otherProps
    }: InputTextProps<V>,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const label = variantProp === "bootstrap" ? undefined : labelProp;
    const variant = variantProp === "bootstrap" ? "outlined" : variantProp;
    const hasAdornment = {
      start:
        typeof slotProps?.input === "object" &&
        typeof slotProps.input.startAdornment !== "undefined",
      end:
        typeof slotProps?.input === "object" &&
        typeof slotProps.input.endAdornment !== "undefined",
    };

    const className = useMemo(
      () =>
        mergeClasses(
          classNameProp ?? "",
          otherProps?.multiline ? textInputClasses.textarea : "",
          variantProp === "bootstrap" ? textInputClasses.bootstrap : "",
          // this will give more handling when render as AutoComplete
          hasAdornment.start ? textInputClasses.hasStartIcon : "",
          hasAdornment.end ? textInputClasses.hasEndIcon : ""
        ),
      [classNameProp, variantProp, otherProps?.multiline, hasAdornment]
    );

    const { focused, handleFocus, handleOutFocus, getInputLabelProps } =
      useFixOverlapLabel({
        onFocus,
        onBlur,
        defaultValue: otherProps.defaultValue,
        value: otherProps.value,
        placeholder: otherProps.placeholder,
        inputLabelProps: slotProps?.inputLabel,
      });

    const getHtmlInputProps = useCallback(
      (ownerState: any) => {
        const extendedProps = {
          notched: String(false), // avoid HTML Error
          ["aria-label"]: label,
          ["aria-invalid"]: String(error),
          ["data-required"]: String(required),
          ["data-error"]: String(error),
          ["data-focused"]: String(focused),
        };
        if (typeof slotProps?.htmlInput === "function") {
          return { ...slotProps.htmlInput(ownerState), ...extendedProps };
        }
        if (typeof slotProps?.htmlInput === "object") {
          return { ...slotProps.htmlInput, ...extendedProps };
        }
        return extendedProps;
      },
      [label, error, focused, required, slotProps?.htmlInput]
    );

    return (
      <FormControlWrapper
        required={required}
        error={error}
        size={size}
        label={labelProp}
        variant={variantProp}
      >
        <StyledComponent
          margin="none"
          color="primary"
          fullWidth
          {...(otherProps as MuiTextFieldProps<V>)}
          ref={ref}
          inputRef={inputRef}
          className={className}
          required={required}
          variant={variant}
          size={size}
          label={label}
          error={error}
          helperText={errorText ?? helperText}
          onFocus={handleFocus}
          onBlur={handleOutFocus}
          slotProps={{
            ...slotProps,
            inputLabel: getInputLabelProps,
            htmlInput: getHtmlInputProps,
          }}
        />
      </FormControlWrapper>
    );
  }
) as <V extends TextInputVariants>(props: InputTextProps<V>) => JSX.Element;
(InputText as ComponentType).displayName = "InputText";

export default InputText;
