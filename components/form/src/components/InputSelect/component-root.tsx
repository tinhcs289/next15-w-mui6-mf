"use client";

import type {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash/debounce";
import get from "lodash/get";
import type { JSX, SyntheticEvent } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type { InputTextProps } from "../InputText";
import Text, { textClasses as classes } from "../InputText";
import type { Option, RHFRenderInput } from "../../types";
import { createFilterOptions } from "./default-filter-options";
import { defaultGetOptionLabel } from "./default-get-option-label";
import { isOptionEqualToValue } from "./default-is-option-equal-to-value";
import { defaultRenderOption } from "./default-render-option";
import type { Any, InputSelectProps, RenderTags, RHFSelectProps } from "./types";

export const InputSelect = forwardRef<unknown, InputSelectProps>(
  function ForwardRef(props, ref) {
    const {
      multiple,
      label,
      required,
      error,
      errorText,
      onInputChange,
      getOptionLabel,
      renderOption,
      filterOptions,
      renderTags,
      options = [],
      loading,
      TextFieldProps,
      color,
      value,
      placeholder,
      enableClientFilter = false,
      filter,
      textChangeTimout = 400,
      ...otherProps
    } = props;

    const disableCloseOnSelect = useMemo(() => !!multiple, [multiple]);

    const memoValue = useMemo(() => {
      if (!options?.length) {
        return value || (multiple ? [] : null);
      }

      if (!multiple) {
        return options.find((o) => o.value === get(value, "value")) || null;
      }

      const val = value as unknown as Option[];

      if (!val?.length) return [];

      return val
        .map((v) => v.value as string)
        .map((k) => options.find((o) => o.value === k))
        .filter(Boolean);
    }, [value, multiple, options]);

    const memoRenderOption = useMemo(
      () =>
        typeof renderOption === "function"
          ? renderOption
          : defaultRenderOption(!!multiple),
      [renderOption, multiple]
    );

    const memoFilterOptions = useMemo(
      () =>
        typeof filterOptions === "function"
          ? filterOptions
          : createFilterOptions(enableClientFilter, filter),
      [filterOptions, enableClientFilter, filter]
    );

    const memoGetOptionLabel = useMemo(
      () =>
        typeof getOptionLabel === "function"
          ? getOptionLabel
          : defaultGetOptionLabel,
      [getOptionLabel]
    );

    const memoRenderTags: RenderTags = useMemo(() => {
      if (typeof renderTags === "function") return renderTags;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const renderFn: RenderTags = (v, g, _o) => (
        <>
          {v?.map?.((opt, index) => (
            <Chip
              size="small"
              color={(color as any) || "primary"}
              label={memoGetOptionLabel(opt)}
              style={{ margin: "1px", maxHeight: "20px" }}
              {...g({ index })}
            />
          ))}
        </>
      );
      return renderFn;
    }, [renderTags, memoGetOptionLabel, color]);

    const handleChangeTextDelay = useMemo(() => {
      return debounce(
        (
          e: SyntheticEvent<Element, Event>,
          v: string,
          r: AutocompleteInputChangeReason
        ) => {
          onInputChange?.(e, v, r);
        },
        textChangeTimout
      );
    }, [onInputChange, textChangeTimout]);

    const memoRenderInput = useCallback(
      (params: AutocompleteRenderInputParams) => {
        const finalProps: InputTextProps = { ...(params as any), ...TextFieldProps };
        if (color) finalProps.color = color as any;
        if (label) {
          finalProps.label = label;
        }

        finalProps.className = `${classes.autocomplete} ${
          multiple ? classes.autocompleteMulti : ""
        } ${finalProps?.className || ""}`;

        if (placeholder) finalProps.placeholder = placeholder;
        if (required) finalProps.required = true;
        if (error) finalProps.error = true;
        if (errorText) finalProps.errorText = errorText;

        if (
          TextFieldProps?.InputProps?.startAdornment ||
          params.InputProps?.startAdornment
        ) {
          finalProps.InputProps = {};
        }

        finalProps.InputProps = {
          ...params?.InputProps,
          ...TextFieldProps?.InputProps,
          ...(TextFieldProps?.InputProps?.startAdornment ||
          params.InputProps?.startAdornment
            ? {
                startAdornment: (
                  <>
                    {TextFieldProps?.InputProps?.startAdornment}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }
            : {}),
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params?.InputProps?.endAdornment}
              {TextFieldProps?.InputProps?.endAdornment}
            </>
          ),
        };

        if (memoValue?.length) {
          finalProps.InputLabelProps = {
            ...finalProps?.InputLabelProps,
          };
        }

        return (
          <Text
            {...finalProps}
            ref={params?.InputProps?.ref}
            value={params?.inputProps?.value}
            defaultValue={params?.inputProps?.defaultValue}
          />
        );
      },
      [
        loading,
        TextFieldProps,
        label,
        color,
        error,
        errorText,
        required,
        placeholder,
        multiple,
        memoValue,
      ]
    );

    return (
      <Autocomplete
        size="small"
        fullWidth
        {...(otherProps as any)}
        options={options}
        value={memoValue}
        ref={ref}
        color={color}
        multiple={multiple}
        filterOptions={memoFilterOptions as any}
        isOptionEqualToValue={isOptionEqualToValue as any}
        renderTags={memoRenderTags as any}
        getOptionLabel={memoGetOptionLabel as any}
        loading={loading}
        onInputChange={handleChangeTextDelay}
        renderOption={memoRenderOption as any}
        disableCloseOnSelect={disableCloseOnSelect}
        renderInput={memoRenderInput}
      />
    );
  }
) as <T extends Any = Any>(props: InputSelectProps<T>) => JSX.Element;
// @ts-ignore
InputSelect.displayName = "InputSelect";

export function RHFSelect(props: RHFSelectProps) {
  const {
    name,
    multiple,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    options = [],
    TextFieldProps,
    ...otherProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onChange, onBlur, value, ref },
      fieldState: { invalid, error },
    }) => {
      return (
        <InputSelect
          {...otherProps}
          multiple={multiple}
          options={options}
          value={value}
          defaultValue={defaultValue || value || undefined}
          onChange={(_, val) => {
            onChange(val);
          }}
          // @ts-ignore
          TextFieldProps={{ ...TextFieldProps, name, onBlur, inputRef: ref }}
          required={!!rules?.required}
          errorText={error?.message ?? undefined}
          error={!!invalid}
        />
      );
    },
    [
      rules?.required,
      defaultValue,
      TextFieldProps,
      multiple,
      name,
      options,
      otherProps,
    ]
  );
  return (
    <Controller
      render={renderInput}
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
    />
  );
}
