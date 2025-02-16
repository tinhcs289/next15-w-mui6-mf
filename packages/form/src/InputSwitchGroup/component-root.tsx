"use client";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import type { RHFRenderInput } from "@shared/types-react/rhf";
import type { AnyObject } from "@shared/types/common";
import Text from "@shared/typo/Text";
import WithRequiredMark from "@shared/typo/WithRequiredMark";
import removeAt from "@shared/utils/array/removeAt";
import type { FocusEventHandler, JSX } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import FormGroupCommon from "../FormGroupCommon";
import ErrorText from "./components/ErrorText";
import ListItemButtonStyled from "./components/ListItemButtonStyled";
import ListStyled from "./components/ListStyled";
import type { InputSwitchGroupProps, RHFSwitchGroupProps, SwitchGroupOption } from "./types";

const InputSwitchGroup = forwardRef<HTMLElement, InputSwitchGroupProps>(
  (props, ref) => {
    const {
      name,
      label,
      required,
      error,
      onChange,
      onFocus,
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

    const memoValue = useMemo(() => {
      return value instanceof Array && value.length > 0 ? value : [];
    }, [value]);

    const isChecked = useCallback(
      (option: SwitchGroupOption) => {
        return (
          (memoValue.length > 0 &&
            memoValue.findIndex((v) => v.value === option.value) >= 0) ||
          !!option?.checked
        );
      },
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
        if (!event?.target?.value) return;
        const val = event.target.value as string;
        const checked = !!event?.target?.checked;
        if (checked) {
          if (memoOption.length === 0) return;
          const i = memoOption.findIndex((o) => o.value === val);
          if (i < 0) return;
          // @ts-ignore
          onChange?.([...memoValue, memoOption[i]]);
        } else {
          if (memoValue.length === 0) return;
          const j = memoValue.findIndex((o) => o.value === val);
          if (j < 0) return;
          onChange?.(removeAt(memoValue, j));
        }
      },
      [
        memoOption,
        memoValue,
        onChange,
        eventStopPropagation,
        eventPreventDefault,
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
                  <Switch
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
      return;
    }, [label, required, labelProps, $Error]);

    const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        onFocus?.(e);
        // e?.target?.scrollIntoView?.({ behavior: "smooth" });
      },
      [onFocus]
    );

    return (
      <FormGroupCommon
        onChange={handleOnchange}
        onFocus={handleFocus}
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
  props: InputSwitchGroupProps<T>
) => JSX.Element;
// @ts-ignore
InputSwitchGroup.displayName = "InputSwitchGroup";

function RHFSwitchGroup<T extends AnyObject = AnyObject>(
  props: RHFSwitchGroupProps<T>
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
      <InputSwitchGroup
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

export { InputSwitchGroup, RHFSwitchGroup };

