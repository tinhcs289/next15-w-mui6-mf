"use client";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import Text from "@shared/typo/Text";
import WithRequiredMark from "@shared/typo/WithRequiredMark";
import type { JSX } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import FormGroupCommon from "../FormGroupCommon";
import type { AnyObject, RHFRenderInput } from "../types";
import ErrorText from "./components/ErrorText";
import ListItemButtonStyled from "./components/ListItemButtonStyled";
import ListStyled from "./components/ListStyled";
import type { InputRadioGroupProps, RHFRadioGroupProps, RadioGroupOption } from "./types";

const InputRadioGroup = forwardRef<HTMLElement, InputRadioGroupProps>(
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
        <ListStyled disablePadding dense {...listProps}>
          {memoOption.map((option) => {
            const checked = isChecked(option);
            const disabled = !!option?.disabled;
            return (
              <ListItemButtonStyled
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
                    component: Text,
                    maxlines: 10,
                    ["aria-label"]: option?.label || option?.name || "",
                    title: option?.label || option?.name || "",
                  }}
                />
              </ListItemButtonStyled>
            );
          })}
        </ListStyled>
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
          <Text
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
          </Text>
          {$Error}
        </>
      );
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
        ref={ref as any}
        tabIndex={1}
        error={error}
      >
        {$Options}
      </FormGroupCommon>
    );
  }
) as <T extends AnyObject = AnyObject>(
  props: InputRadioGroupProps<T>
) => JSX.Element;
// @ts-ignore
InputRadioGroup.displayName = "InputRadioGroup";

function RHFRadioGroup<T extends AnyObject = AnyObject>(
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
      <InputRadioGroup
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

export { InputRadioGroup, RHFRadioGroup };

