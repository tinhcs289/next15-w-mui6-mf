"use client";

import type { ListProps } from "@mui/material/List";
import List from "@mui/material/List";
import ListItemAvatar, {
  listItemAvatarClasses,
} from "@mui/material/ListItemAvatar";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText, { listItemTextClasses } from "@mui/material/ListItemText";
import type { RadioProps } from "@mui/material/Radio";
import Radio from "@mui/material/Radio";
import type { AnyObject } from "@repo/types/common";
import type { ComponentType, JSX, ReactNode } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type { MuiSx } from "@repo/types-react/mui";
import type { Option, RHFInputProps, RHFRenderInput } from "@repo/types-react/rhf";
import type { TypoProps } from "../typo/Typo";
import Typo from "../typo/Typo";
import WithRequiredMark from "../typo/WithRequiredMark";
import type { FormGroupCommonProps } from "./FormGroupCommon";
import FormGroupCommon from "./FormGroupCommon";
import type { InputErrorProps } from "./InputError";
import InputError from "./InputError";

function ErrorText({
  sx,
  children,
  slotProps = {},
  ...props
}: InputErrorProps) {
  const { text: textProps, ...otherSlotProps } = slotProps;
  return (
    <InputError
      {...props}
      sx={{ display: "flex", ...sx }}
      slotProps={{
        ...otherSlotProps,
        text: {
          ...textProps,
          sx: {
            ...textProps?.sx,
            right: "unset",
            left: "-50%",
          },
        },
      }}
    >
      {children}
    </InputError>
  );
}

type RadioGroupOption<T extends AnyObject = AnyObject> = Option<
  T & {
    InputProps?: Partial<
      Omit<RadioProps, "name" | "value" | "checked" | "disabled" | "onChange">
    >;
  }
>;

type RadioGroupProps<T extends AnyObject = AnyObject> = Omit<
  FormGroupCommonProps,
  "onChange" | "slotProps"
> & {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  options?: RadioGroupOption<T>[];
  value?: RadioGroupOption<T>;
  onChange?: (option?: RadioGroupOption<T> | null) => void;
  /**
   * @default true
   */
  eventStopPropagation?: boolean;
  /**
   * @default false
   */
  eventPreventDefault?: boolean;
  slotProps?: FormGroupCommonProps["slotProps"] & {
    labelTypography?: Partial<TypoProps<"label">>;
    error?: Partial<InputErrorProps>;
    list?: Partial<ListProps>;
    option?: Partial<ListItemButtonProps>;
  };
};

const RadioGroupBase = forwardRef<HTMLElement, RadioGroupProps>(
  (props, ref) => {
    const {
      name,
      label,
      required,
      error,
      onChange,
      errorText,
      options,
      value,
      eventStopPropagation = true,
      eventPreventDefault = false,
      slotProps = {},
      ...formControlProps
    } = props;

    const {
      error: errorProps,
      label: labelRootProps,
      labelTypography: labelProps,
      list: listProps,
      option: optionProps,
      ...otherSlotProps
    } = slotProps;

    const memoOption = useMemo(() => {
      return options instanceof Array && options.length > 0 ? options : [];
    }, [options]);

    const memoValue = useMemo(() => value, [value]);

    const isChecked = useCallback(
      (option: RadioGroupOption) =>
        !!memoValue?.value
          ? memoValue.value === option.value
          : !!option?.checked,
      [memoValue]
    );

    const handleOnchange = useCallback(
      (event: any) => {
        if (eventStopPropagation) {
          event?.stopPropagation?.();
        }
        if (eventPreventDefault) {
          event?.preventDefault?.();
        }

        const targetValue = event?.target?.value as string;
        if (!targetValue) return;

        if (memoValue?.value === targetValue) {
          onChange?.(null);
          return;
        }

        const checked = !!event?.target?.checked;

        if (!checked) {
          onChange?.(null);
          return;
        }

        const newValue =
          memoOption?.find?.((o) => o.value === targetValue) || null;

        onChange?.(newValue);
      },
      [
        memoOption,
        memoValue?.value,
        eventStopPropagation,
        eventPreventDefault,
        onChange,
      ]
    );

    const $Options = useMemo(() => {
      if (!memoOption?.length) return null;
      return (
        <List
          disablePadding
          dense
          {...listProps}
          sx={{ width: "100%", ...listProps?.sx }}
        >
          {memoOption.map((option) => {
            const checked = isChecked(option);
            const disabled = !!option?.disabled;
            return (
              <ListItemButton
                key={option.value}
                {...optionProps}
                disabled={disabled}
                selected={checked}
                onClick={(e) => {
                  e?.stopPropagation?.();
                  e?.preventDefault?.();
                  // @ts-ignore
                  e.target["value"] = option.value;
                  // @ts-ignore
                  e.target["checked"] = !checked;
                  handleOnchange(e);
                }}
                sx={{ p: 0, alignItems: "flex-start", ...optionProps?.sx }}
              >
                <ListItemAvatar>
                  <Radio
                    {...option.InputProps}
                    // @ts-ignore
                    error={`${!!error}`}
                    name={name}
                    value={option.value}
                    checked={checked}
                    aria-label={option?.label || option?.name || ""}
                    title={option?.label || option?.name || ""}
                    disabled={disabled}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={option?.label || option?.name || ""}
                  primaryTypographyProps={{
                    component: Typo,
                    maxlines: 10,
                    ["aria-label"]: option?.label || option?.name || "",
                    title: option?.label || option?.name || "",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      );
    }, [
      name,
      memoOption,
      error,
      listProps,
      optionProps,
      handleOnchange,
      isChecked,
    ]);

    const $Error = useMemo(
      () =>
        !!error && !!errorText ? (
          <ErrorText {...errorProps}>{errorText}</ErrorText>
        ) : null,
      [error, errorText, errorProps]
    );

    const $Label = useMemo(() => {
      if (!label) return null;
      return (
        <>
          <Typo
            maxLines={1}
            component="label"
            {...labelProps}
            sx={{
              fontSize: "inherit",
              color: "inherit",
              fontWeight: "inherit",
              ...labelProps?.sx,
            }}
          >
            <WithRequiredMark required={required}>{label}</WithRequiredMark>
          </Typo>
          {$Error}
        </>
      );
      return;
    }, [label, required, labelProps, $Error]);

    return (
      <FormGroupCommon
        onChange={handleOnchange as any}
        {...formControlProps}
        label={$Label}
        slotProps={{
          ...otherSlotProps,
          label: {
            gap: "4px",
            ...labelRootProps,
          },
        }}
        ref={ref}
        tabIndex={1}
        error={error}
      >
        {$Options}
      </FormGroupCommon>
    );
  }
) as <T extends AnyObject = AnyObject>(
  props: RadioGroupProps<T>
) => JSX.Element;

// @ts-ignore
RadioGroupBase.displayName = "RadioGroupBase";

type RHFRadioGroupProps<T extends AnyObject = AnyObject> = RHFInputProps &
  Omit<
    RadioGroupProps<T>,
    "errorText" | "error" | "onChange" | "value" | "name" | "defaultValue"
  > & {
    defaultValue?: string;
  };

function RHFRadioGroupBase<T extends AnyObject = AnyObject>(
  props: RHFRadioGroupProps<T>
) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister = false,
    label,
    ...inputProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, name, ref },
      fieldState: { invalid, error },
    }) => (
      <RadioGroup
        label={label}
        {...inputProps}
        name={name}
        value={value}
        ref={ref}
        defaultValue={defaultValue ?? undefined}
        onChange={onChange}
        onBlur={onBlur}
        error={invalid}
        required={!!rules?.required}
        errorText={error?.message ?? undefined}
      />
    ),
    [rules?.required, inputProps, defaultValue, label]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? undefined}
      shouldUnregister={shouldUnregister}
      render={renderInput}
    />
  );
}

const listSx: MuiSx = {
  padding: (theme) => theme.spacing(0.75),
  borderRadius: (theme) => theme.spacing(0.5),
  border: (theme) => `1px solid ${theme.palette.grey[300]}`,
};

const optionSx: MuiSx = {
  background: (theme) => theme.palette.background.paper,
  alignItems: "center",
  // flexDirection: "row-reverse",
  borderRadius: (theme) => theme.spacing(0.5),
  boxShadow: (theme) => theme.shadows[3],
  ":not(:last-child)": {
    marginBottom: (theme) => theme.spacing(1),
  },
  [`.${listItemAvatarClasses.root}`]: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    minWidth: (theme) => theme.spacing(5.25),
  },
  [`.${listItemTextClasses.root}`]: {
    paddingLeft: (theme) => theme.spacing(1.5),
    paddingRight: (theme) => theme.spacing(1),
    position: "relative",
    "::after": {
      position: "absolute",
      content: "''",
      display: "block",
      left: 0,
      top: "50%",
      width: "1px",
      height: "80%",
      transform: "translateY(-50%)",
      background: (theme) => theme.palette.grey[300],
    },
  },
};

function withCommonStyle<P extends RadioGroupProps = RadioGroupProps>(
  WrappedComponent: ComponentType<P>,
  displayName?: string
) {
  const CompositedComponent = forwardRef<unknown, P>(
    ({ slotProps = {}, ...otherProps }, ref) => {
      const {
        list: listProps,
        option: optionProps,
        ...otherSlotProps
      } = slotProps;
      return (
        <WrappedComponent
          slotProps={{
            ...otherSlotProps,
            list: { ...listProps, sx: { ...listSx, ...listProps?.sx } },
            option: { ...optionProps, sx: { ...optionSx, ...optionProps?.sx } },
          }}
          {...(otherProps as any)}
          ref={ref as any}
        />
      );
    }
  );
  CompositedComponent.displayName = displayName;
  return CompositedComponent;
}

const RadioGroup = withCommonStyle(RadioGroupBase as any, "RadioGroup") as <
  T extends AnyObject = AnyObject,
>(
  props: RadioGroupProps<T>
) => JSX.Element;

const RHFRadioGroup = withCommonStyle(
  RHFRadioGroupBase as any,
  "RHFRadioGroup"
) as <T extends AnyObject = AnyObject>(
  props: RHFRadioGroupProps<T>
) => JSX.Element;

export default RadioGroup;
export { RHFRadioGroup };
export type { RadioGroupOption, RadioGroupProps, RHFRadioGroupProps };

