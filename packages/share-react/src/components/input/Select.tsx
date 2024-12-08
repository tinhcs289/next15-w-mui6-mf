"use client";

import type { FilterOptionsState } from "@mui/material";
import type {
  AutocompleteInputChangeReason,
  AutocompleteOwnerState,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteChangeDetails as ChangeDetails,
  AutocompleteChangeReason as ChangeReason,
  AutocompleteRenderGetTagProps as GetTagProps,
} from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import type { ChipTypeMap } from "@mui/material/Chip";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import type { AnyObject } from "@repo/types/common";
import debounce from "lodash/debounce";
import get from "lodash/get";
import type { HTMLAttributes, JSX, ReactNode, SyntheticEvent } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type { Option, RHFInputProps, RHFRenderInput } from "../../types/rhf";
import type { TextProps } from "./Text";
import Text, { textClasses as classes } from "./Text";

type OptionComponentProps<T extends AnyObject = AnyObject> = {
  liElementProps: HTMLAttributes<HTMLLIElement>;
  option: Option<T>;
  renderState: AutocompleteRenderOptionState;
};

type RenderSelectOptionCallback<T extends AnyObject = AnyObject> = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Option<T>,
  state: AutocompleteRenderOptionState
) => JSX.Element;

type BaseSelectProps = AutocompleteProps<
  Option,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined,
  ChipTypeMap["defaultComponent"]
>;

type OnChangeValue<T extends AnyObject = AnyObject> =
  | NonNullable<string | Option<T>>
  | (string | Option<T>)[]
  | null;

type OnChange<T extends AnyObject = AnyObject> = (
  event: SyntheticEvent<Element, Event>,
  value: OnChangeValue<T>,
  reason: ChangeReason,
  details: ChangeDetails<Option<T>> | undefined
) => void;

type OwnerState<T extends AnyObject = AnyObject> = AutocompleteOwnerState<
  Option<T>,
  boolean,
  boolean,
  boolean,
  "div"
>;

type RenderTags<T extends AnyObject = AnyObject> = (
  value: Option<T>[],
  getTagProps: GetTagProps,
  ownerState: OwnerState<T>
) => ReactNode;

type SelectProps<T extends AnyObject = AnyObject> = Pick<
  TextProps,
  "label" | "error" | "required" | "errorText" | "placeholder"
> &
  Omit<BaseSelectProps, "renderInput" | "options"> & {
    options?: Option<T>[];
    TextFieldProps?: Partial<TextProps>;
    enableClientFilter?: boolean;
    filter?:
      | ((option: Option<T>, inputValue: string) => boolean)
      | "startWith"
      | "contains";
    textChangeTimout?: number;
  };

type RHFSelectProps = RHFInputProps & Omit<SelectProps, "name">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultRenderOption(_multiple: boolean) {
  return (
    props: HTMLAttributes<HTMLLIElement>,
    option: Option,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: AutocompleteRenderOptionState
  ) => {
    return (
      <li {...props} key={`${option.value}`}>
        {option?.label || ""}
      </li>
    );
  };
}

function defaultFilterOptions(
  options: Option[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _state: FilterOptionsState<Option>
) {
  return options;
}

function removeVietnameseAccentMarks(value?: string) {
  return typeof value === "string"
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
      )(value)
    : "";
}

function clean(value?: string) {
  if (!value) return "";
  return removeVietnameseAccentMarks(value).toLowerCase().trim();
}

function createFilterOptions(
  enableClientFilter: boolean,
  filter:
    | ((option: Option, inputValue: string) => boolean)
    | "startWith"
    | "contains" = "startWith"
) {
  if (!enableClientFilter) return defaultFilterOptions;
  return function filterOptions(
    options: Option[],
    state: FilterOptionsState<Option>
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
}

function defaultGetOptionLabel(option: string | Option) {
  return typeof option === "string" ? option : option?.label || "";
}

function isOptionEqualToValue(option: Option, value: Option | string) {
  return (
    option?.value === (value as string) ||
    option?.value === (value as Option)?.value
  );
}

const Select = forwardRef<unknown, SelectProps>(
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
        const finalProps: TextProps = { ...(params as any), ...TextFieldProps };
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
) as <T extends AnyObject = AnyObject>(props: SelectProps<T>) => JSX.Element;

function RHFSelect(props: RHFSelectProps) {
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
        <Select
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

export default Select;
export { RHFSelect };
export type {
  BaseSelectProps,
  OnChange,
  OnChangeValue,
  OptionComponentProps,
  OwnerState,
  RenderSelectOptionCallback,
  RenderTags,
  RHFSelectProps,
  SelectProps,
};
