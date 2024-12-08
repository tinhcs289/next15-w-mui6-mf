"use client";

import { styled } from "@mui/material";
import InputAdornment, {
  inputAdornmentClasses,
} from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import type { ComponentType, ReactNode } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import type { RHFInputProps, RHFRenderInput } from "../../types/rhf";
import InputError from "./InputError";

const textClasses = {
  hasStartIcon: "has-start-icon",
  textarea: "is-textarea",
  autocomplete: "is-autocomplete",
  autocompleteMulti: "is-autocomplete--multiple",
  taginput: "is-taginput",
};

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  [`&.${textFieldClasses.root}`]: {
    [`.${inputLabelClasses.root}`]: {
      fontWeight: 600,
      [`&.${inputLabelClasses.focused}`]: {},
      [`&.${inputLabelClasses.shrink}`]: {},
      [`&.${inputLabelClasses.error}`]: {},
      [`&.${inputLabelClasses.disabled}`]: {},
    },
    [`.${inputBaseClasses.root}`]: {
      [`&.${inputBaseClasses.adornedEnd}`]: {
        paddingRight: theme.spacing(0.5),
      },
      [`.${inputBaseClasses.input}`]: {
        "--tw-ring-color": "transparent !important",
        "--tw-ring-shadow": "transparent !important",
      },
      [`.${inputAdornmentClasses.root}`]: {},

      "& fieldset": {
        "& legend": {},
      },
    },
  },
}));

// export const TextFieldStyled = styled(TextField, {
//   shouldForwardProp: (p) => p !== "rows",
// })<TextFieldProps>(({ rows = 1, theme }) => ({
//   padding: 0,

//   minHeight: "64px",
//   "label.MuiFormLabel-root.MuiInputLabel-root": {
//     top: "10px",
//     fontSize: "14px",
//     lineHeight: "20px",
//     fontWeight: 400,
//     "&.Mui-focused": {
//       transform: "translate(14px, 0px) scale(0.75) !important",
//       color: theme.palette.grey[300],
//     },
//     "&.MuiInputLabel-shrink": {
//       transform: "translate(14px, 0px) scale(0.75) !important",
//       color: theme.palette.grey[300],
//     },
//   },
//   ".MuiInputBase-root": {
//     gap: "16px",
//     minHeight: "64px",
//     padding: "10px 16px",
//     backgroundColor: "transparent",
//     borderRadius: "8px",
//     ".MuiInputBase-input": {
//       fontSize: "14px",
//       padding: "0 !important",
//       height: "20px",
//       marginBottom: "-18px",
//       border: "none !important",
//       borderColor: "transparent !important",
//       "--tw-ring-color": "transparent !important",
//       "--tw-ring-shadow": "transparent !important",
//     },
//     ".MuiInputAdornment-root": {
//       margin: "0 !important",
//       height: "100%",
//     },
//     "& fieldset": {
//       top: 0,
//       "& legend": {
//         display: "none",
//       },
//     },
//   },
//   [`&.${textClasses.hasStartIcon}`]: {
//     "label.MuiFormLabel-root.MuiInputLabel-root": {
//       left: "40px",
//     },
//   },
//   [`&.${textClasses.autocomplete}`]: {
//     ".MuiInputBase-root": {
//       "& > input": {
//         marginLeft: "0 !important",
//       },
//     },
//     [`&:not(.${textClasses.hasStartIcon})`]: {
//       ".MuiInputBase-root": {
//         "& > input": {
//           marginLeft: "8px !important",
//         },
//       },
//     },
//     ".MuiInputAdornment-root": {
//       marginLeft: "8px !important",
//       height: "100%",
//     },
//     [`&.${textClasses.autocompleteMulti}`]: {
//       ".MuiInputBase-root": {
//         gap: "2px",
//         paddingTop: "28px !important",
//         "input.MuiInputBase-input": {
//           padding: "0 0 8px 0 !important",
//         },
//       },
//     },
//   },
//   [`&.${textClasses.textarea}`]: {
//     minHeight: `${48 + +rows * 20}px`,
//     alignItems: "flex-start",
//     ".MuiInputBase-root": {
//       alignItems: "flex-start",
//       ".MuiInputAdornment-root": {
//         marginTop: `${(64 - 2 * 24) / 2}px !important`,
//       },
//       "textarea.MuiInputBase-input": {
//         minHeight: `${+rows * 20}px`,
//         marginTop: "18px",
//         marginBottom: "0 !important",
//       },
//     },
//   },
//   position: "relative",
//   ".MuiFormHelperText-root.Mui-error": {
//     position: "absolute",
//     right: 0,
//     bottom: "-20px",
//     margin: "2px 0 0",
//   },
//   ".MuiInputBase-root:before": {
//     borderBottom: "none !important",
//   },
//   ".MuiInputBase-root:after": {
//     borderBottom: "none !important",
//   },
// }));

type TextProps = TextFieldProps & {
  errorText?: ReactNode;
  StyledComponent?: typeof TextFieldStyled | ComponentType;
};

const Text = forwardRef<HTMLDivElement, TextProps>(
  function ForwardRef(props, ref) {
    const {
      errorText,
      error,
      inputProps,
      InputProps,
      StyledComponent = TextFieldStyled,
      onFocus,
      onBlur,
      InputLabelProps,
      className,
      ...otherProps
    } = props;

    const [focused, setFocused] = useState(false);

    const handleFocus: Required<TextProps>["onFocus"] = useCallback(
      (e) => {
        setTimeout(() => {
          setFocused(true);
        }, 0);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleOutFocus: Required<TextProps>["onBlur"] = useCallback(
      (e) => {
        setTimeout(() => {
          setFocused(false);
        }, 0);
        onBlur?.(e);
      },
      [onBlur]
    );

    const memoInputLabelProps: Required<TextProps>["InputLabelProps"] =
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
      return cls;
    }, [className, props?.multiline, InputProps?.startAdornment]);

    return (
      <StyledComponent
        size="small"
        margin="none"
        color="primary"
        ref={ref}
        fullWidth
        error={!!error}
        className={memoClassName}
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
        onFocus={handleFocus}
        onBlur={handleOutFocus}
        {...otherProps}
      />
    );
  }
) as ComponentType<TextProps>;

type RHFTextProps = RHFInputProps &
  Omit<
    TextProps,
    | "name"
    | "defaultValue"
    | "value"
    | "error"
    | "errorText"
    | "onChange"
    | "required"
  > & {
    defaultValue?: string;
  };

function RHFText(props: RHFTextProps) {
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
      <Text
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

export default Text;
export { RHFText, textClasses };
export type { RHFTextProps, TextProps };
