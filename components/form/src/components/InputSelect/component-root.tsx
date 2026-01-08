"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterOptionsState } from "@mui/material";
import type {
  AutocompleteInputChangeReason,
  AutocompleteOwnerState,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteRenderValue,
  AutocompleteRenderValueGetItemProps,
} from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import type { ChipProps, ChipTypeMap } from "@mui/material/Chip";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Radio from "@mui/material/Radio";
import debounce from "lodash/debounce";
import type {
  ComponentType,
  ForwardedRef,
  HTMLAttributes,
  JSX,
  ReactNode,
  SyntheticEvent,
} from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import get from "../../helpers/get";
import type { Option, RHFControlledInputProps } from "../../types";
import type { InputTextProps, TextInputVariants } from "../text/InputText";
import InputText, { textInputClasses as classes } from "../text/InputText";
import mergeRefs from "@/helpers/mergeRefs";

type OptionData = { [x: string]: any };

export type SelectOption<T extends OptionData = OptionData> = Option<T>;

export type RenderSelectOption<T extends OptionData = OptionData> = (
  props: HTMLAttributes<HTMLLIElement>,
  option: SelectOption<T>,
  state: AutocompleteRenderOptionState
) => ReactNode;

const defaultRenderOption =
  <T extends OptionData = OptionData>(
    multiple: boolean = false
  ): RenderSelectOption<T> =>
  (props, option, state) => (
    <li key={`${option.value}`} {...props}>
      {multiple ? (
        <Checkbox sx={{ mr: 8 }} checked={!!state.selected} />
      ) : (
        <Radio sx={{ mr: 8 }} checked={!!state.selected} />
      )}
      {option?.label || ""}
    </li>
  );

const defaultIsOptionEqualToValue = <T extends OptionData = OptionData>(
  option: SelectOption<T>,
  value: SelectOption<T> | string
) =>
  option?.value === (value as string) ||
  option?.value === (value as SelectOption<T>)?.value;

const defaultGetOptionLabel = <T extends OptionData = OptionData>(
  option: string | SelectOption<T>
) => (typeof option === "string" ? option : option?.label || "");

const useGetValueProp = <T extends OptionData = OptionData>({
  value,
  multiple = false,
  options = [],
}: {
  value?: SelectOption<T> | SelectOption<T>[] | null;
  multiple?: boolean;
  options?: SelectOption<T>[];
}) => {
  return useMemo(() => {
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
};

const mergeClasses = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export type RenderSelectedValuesAsTags<T extends OptionData = OptionData> = (
  value: AutocompleteRenderValue<SelectOption<T>, boolean, boolean>,
  getItemProps: AutocompleteRenderValueGetItemProps<boolean>,
  ownerState: AutocompleteOwnerState<
    SelectOption<T>,
    boolean,
    boolean,
    boolean,
    "div"
  >
) => ReactNode;

const defaultFilterOptions = <T extends OptionData = OptionData>(
  options: SelectOption<T>[],
  _state: FilterOptionsState<SelectOption<T>>
) => options;

const createFilterOptions = <T extends OptionData = OptionData>(
  enableClientFilter: boolean,
  filter:
    | ((option: SelectOption<T>, inputValue: string) => boolean)
    | "startWith"
    | "contains" = "startWith"
) => {
  if (!enableClientFilter) return defaultFilterOptions;
  return function filterOptions(
    options: SelectOption<T>[],
    state: FilterOptionsState<SelectOption<T>>
  ) {
    if (!options) return [];
    if (!(options instanceof Array)) return [];
    if (options.length === 0) return [];
    const { inputValue, getOptionLabel } = state;
    if (!inputValue) return options;
    if (!inputValue.trim()) return options;
    if (typeof filter === "function") {
      return options.filter((o) => {
        try {
          const isMatch = filter(o, inputValue);
          return isMatch;
        } catch {
          return false;
        }
      });
    }

    const removeVietnameseAccentMarks = (text?: string) =>
      typeof text === "string"
        ? ((...fns: ((t: string) => string)[]) => {
            return fns.reduceRight((f, g) => (t) => f(g(t)));
          })(
            (t) => t.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"),
            (t) => t.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A"),
            (t) => t.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"),
            (t) => t.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E"),
            (t) => t.replace(/ì|í|ị|ỉ|ĩ/g, "i"),
            (t) => t.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I"),
            (t) => t.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"),
            (t) => t.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O"),
            (t) => t.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"),
            (t) => t.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U"),
            (t) => t.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"),
            (t) => t.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y"),
            (t) => t.replace(/đ/g, "d"),
            (t) => t.replace(/Đ/g, "D"),
            (t) => t.trim()
          )(text)
        : "";

    const clean = (text?: string) =>
      !text ? "" : removeVietnameseAccentMarks(text).toLowerCase().trim();

    const keyword = clean(inputValue);

    if (filter === "startWith") {
      return options.filter((o) => {
        try {
          const label = clean(getOptionLabel(o) || o.label);
          const isMatch = label.startsWith(keyword);
          return isMatch;
        } catch {
          return false;
        }
      });
    }

    if (filter === "contains") {
      return options.filter((o) => {
        try {
          const label = clean(getOptionLabel(o) || o.label);
          const isMatch = label.includes(keyword);
          return isMatch;
        } catch {
          return false;
        }
      });
    }
    return options;
  };
};

type BaseSelectProps<T extends OptionData = OptionData> = AutocompleteProps<
  SelectOption<T>,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined,
  ChipTypeMap["defaultComponent"]
>;

export type InputSelectProps<
  T extends OptionData,
  V extends TextInputVariants,
> = Omit<
  BaseSelectProps<T>,
  "renderInput" | "options" | "value" | "defaultValue"
> & {
  label?: string;
  error?: boolean;
  required?: boolean;
  errorText?: string;
  placeholder?: string;
  variant?: V;
  value?: SelectOption<T> | SelectOption<T>[] | null;
  defaultValue?: SelectOption<T> | SelectOption<T>[] | null;
  options?: SelectOption<T>[];
  enableClientFilter?: boolean;
  filter?:
    | ((option: SelectOption<T>, inputValue: string) => boolean)
    | "startWith"
    | "contains";
  textChangeTimeout?: number;
  textFieldProps?: Partial<InputTextProps<V>>;
};

export const InputSelect = forwardRef(
  <T extends OptionData, V extends TextInputVariants>(
    {
      multiple,
      label,
      required,
      error,
      errorText,
      onInputChange,
      value: valueProp,
      renderOption: renderOptionProp,
      getOptionLabel = defaultGetOptionLabel,
      isOptionEqualToValue = defaultIsOptionEqualToValue,
      filterOptions: filterOptionsProp,
      renderTags: renderTagsProp,
      renderValue: renderValueProp,
      options = [],
      loading,
      variant,
      textFieldProps,
      color,
      placeholder,
      enableClientFilter = false,
      filter,
      textChangeTimeout = 300,
      ...otherProps
    }: InputSelectProps<T, V>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const value = useGetValueProp<T>({ value: valueProp, multiple, options });

    const disableCloseOnSelect = useMemo(() => !!multiple, [multiple]);

    const filterOptions = useMemo(
      () =>
        typeof filterOptionsProp === "function"
          ? filterOptionsProp
          : createFilterOptions(enableClientFilter, filter),
      [filterOptionsProp, enableClientFilter, filter]
    );

    const renderOption = useMemo(() => {
      if (typeof renderOptionProp === "function") return renderOptionProp;
      return defaultRenderOption(multiple);
    }, [renderOptionProp, multiple]);

    const renderValue = useMemo(() => {
      if (typeof renderValueProp === "function") return renderValueProp;
      const renderFn: RenderSelectedValuesAsTags<T> = (
        selectedValue,
        getItemProps,
        _states
      ) => (
        <>
          {(selectedValue as SelectOption<T>[])?.map?.((item, index) => (
            <Chip
              size="small"
              color={(color as ChipProps["color"]) || "primary"}
              label={getOptionLabel(item)}
              style={{ margin: "1px", maxHeight: "20px" }}
              {...getItemProps({ index })}
            />
          ))}
        </>
      );
      return renderFn;
    }, [renderValueProp, getOptionLabel, color]);

    const handleTextChange = useMemo(
      () =>
        debounce(
          (
            event: SyntheticEvent<Element, Event>,
            textValue: string,
            reason: AutocompleteInputChangeReason
          ) => {
            onInputChange?.(event, textValue, reason);
          },
          textChangeTimeout
        ),
      [onInputChange, textChangeTimeout]
    );

    const inputTextProps = useMemo(
      () =>
        ({
          ...textFieldProps,
          color,
          variant: variant || textFieldProps?.variant,
          label,
          placeholder,
          required,
          error,
          errorText,
          className: mergeClasses(
            textFieldProps?.className || "",
            classes.autocomplete,
            multiple ? classes.autocompleteMulti : ""
          ),
        }) as Partial<InputTextProps<V>>,
      [
        color,
        variant,
        label,
        placeholder,
        required,
        error,
        errorText,
        multiple,
        textFieldProps,
      ]
    );

    const renderInput = useCallback(
      (params: AutocompleteRenderInputParams) => {
        const finalProps: InputTextProps<V> = {
          ...(params as unknown as InputTextProps<V>),
          inputTextProps,
        };

        if (loading) {
          finalProps.slotProps = {
            ...finalProps.slotProps,
            input: {
              ...finalProps.slotProps?.input,
              endAdornment: <CircularProgress color="inherit" size={20} />,
            },
          };
        }

        return (
          <InputText
            {...finalProps}
            ref={params?.InputProps?.ref}
            value={params?.inputProps?.value ?? finalProps.value}
            defaultValue={
              params?.inputProps?.defaultValue ?? finalProps.defaultValue
            }
          />
        );
      },
      [inputTextProps, loading]
    );

    return (
      <Autocomplete
        size="small"
        fullWidth
        popupIcon={<ExpandMoreIcon />}
        {...otherProps}
        options={options}
        value={value as BaseSelectProps<T>["value"]}
        ref={ref}
        color={color}
        multiple={multiple}
        loading={loading}
        disableCloseOnSelect={disableCloseOnSelect}
        onInputChange={handleTextChange}
        renderInput={renderInput}
        renderOption={renderOption}
        renderValue={renderValue}
        filterOptions={filterOptions}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={getOptionLabel}
      />
    );
  }
) as <T extends OptionData, V extends TextInputVariants>(
  props: InputSelectProps<T, V>
) => JSX.Element;
(InputSelect as ComponentType).displayName = "InputSelect";

export type RHFSelectProps<
  T extends OptionData,
  V extends TextInputVariants,
> = RHFControlledInputProps<InputSelectProps<T, V>>;

export const RHFSelect = forwardRef(
  <T extends OptionData, V extends TextInputVariants>(
    {
      name,
      control,
      rules,
      defaultValue,
      shouldUnregister,
      onChange: externalOnChange,
      onBlur: externalOnBlur,
      textFieldProps,
      ...otherProps
    }: Omit<RHFSelectProps<T, V>, "ref">,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({
          field: { onChange, onBlur, value, ref: fieldRef },
          fieldState: { invalid, error },
        }) => (
          <InputSelect
            {...otherProps}
            value={value || null}
            defaultValue={defaultValue || value || undefined}
            onChange={(event, newValue, reason, details) => {
              onChange(newValue);
              externalOnChange?.(event, newValue, reason, details);
            }}
            onBlur={(...args) => {
              onBlur();
              externalOnBlur?.(...args);
            }}
            textFieldProps={
              {
                ...textFieldProps,
                name,
              } as Partial<InputTextProps<V>>
            }
            required={!!rules?.required}
            errorText={error?.message ?? undefined}
            error={!!invalid}
            ref={mergeRefs(ref, fieldRef)}
          />
        )}
      />
    );
  }
) as <T extends OptionData, V extends TextInputVariants>(
  props: RHFSelectProps<T, V>
) => JSX.Element;
(RHFSelect as ComponentType).displayName = "RHFSelect";
