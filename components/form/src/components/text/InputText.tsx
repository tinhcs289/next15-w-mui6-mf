"use client";

import { styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import type {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import type {
  ComponentType,
  FocusEvent,
  ForwardedRef,
  JSX,
  PropsWithChildren,
  ReactNode,
} from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import mergeClasses from "../../helpers/mergeClasses";

export const textInputClasses = {
  ...textFieldClasses,
  hasStartIcon: "has-start-icon",
  hasEndIcon: "has-end-icon",
  textarea: "is-textarea",
  autocomplete: "is-autocomplete",
  autocompleteMulti: "is-autocomplete--multiple",
  tagInput: "is-tag-input",
  bootstrap: "bootstrap",
  bootstrapFormControl: "bootstrap-control",
  bootstrapFormLabel: "bootstrap-label",
};

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  [`&.${textFieldClasses.root}`]: {
    [`.${inputLabelClasses.root}`]: {
      fontWeight: 600,
    },
    [`.${inputBaseClasses.root}`]: {
      [`&.${inputBaseClasses.adornedEnd}`]: {
        paddingRight: theme.spacing(0.5),
      },
      [`.${inputBaseClasses.input}`]: {
        "--tw-ring-color": "transparent !important",
        "--tw-ring-shadow": "transparent !important",
      },
    },
  },
}));
TextFieldStyled.displayName = "TextFieldStyled";

export type TextInputVariants = TextFieldVariants | "bootstrap";

type MuiVariant<V extends TextInputVariants> = V extends "standard"
  ? "standard"
  : V extends "filled"
    ? "filled"
    : "outlined";

const FormControlWrapper = ({
  children,
  required = false,
  error = false,
  size = "small",
  label = "",
  variant,
}: PropsWithChildren<{
  required?: boolean;
  error?: boolean;
  size?: "small" | "medium";
  label?: ReactNode;
  variant?: TextInputVariants;
}>) => {
  return variant === "bootstrap" ? (
    <FormControl
      className={textInputClasses.bootstrapFormControl}
      required={required}
      error={error}
      size={size}
      fullWidth
    >
      <FormLabel
        className={textInputClasses.bootstrapFormLabel}
        sx={{ fontWeight: 600, mb: "4px" }}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  ) : (
    children
  );
};

type FocusHandler = (
  e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

type MuiTextFieldProps<V extends TextInputVariants> = TextFieldProps<
  MuiVariant<V>
>;

export type InputTextProps<V extends TextInputVariants> = Omit<
  MuiTextFieldProps<V>,
  "variant"
> & {
  variant?: V;
  errorText?: ReactNode;
  StyledComponent?: ComponentType<MuiTextFieldProps<V>>;
};

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
    [
      focused,
      inputLabelProps,
      placeholder,
      value,
      defaultValue,
    ]
  );

  const getInputLabelProps = useCallback((ownerState: any) => {
      let props = { shrink };
      if (typeof inputLabelProps === "function") {
        props = { ...inputLabelProps(ownerState), shrink };
      }
      if (typeof inputLabelProps === "object") {
        props = { ...inputLabelProps, shrink };
      }
      return props;
    }, [shrink, inputLabelProps]);


  return { focused, handleFocus, handleOutFocus, getInputLabelProps };
};

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

    const { focused, handleFocus, handleOutFocus, getInputLabelProps } =
      useFixOverlapLabel({
        onFocus,
        onBlur,
        defaultValue: otherProps.defaultValue,
        value: otherProps.value,
        placeholder: otherProps.placeholder,
        inputLabelProps: slotProps?.inputLabel,
      });

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
            htmlInput: {
              ...(slotProps?.htmlInput || {}),
              notched: String(false), // avoid HTML Error
              ["aria-label"]: label,
              ["aria-invalid"]: String(error),
              ["data-required"]: String(required),
              ["data-error"]: String(error),
              ["data-focused"]: String(focused),
            },
          }}
        />
      </FormControlWrapper>
    );
  }
) as <V extends TextInputVariants>(props: InputTextProps<V>) => JSX.Element;
(InputText as ComponentType).displayName = "InputText";

export default InputText;