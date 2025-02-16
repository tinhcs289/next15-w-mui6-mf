"use client";

import Checkbox from "@mui/material/Checkbox";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import type { RHFRenderInput } from "@shared/types-react/rhf";
import type { AnyObject } from "@shared/types/common";
import Text from "@shared/typo/Text";
import WithRequiredMark from "@shared/typo/WithRequiredMark";
import removeAt from "@shared/utils/array/removeAt";
import type { FocusEventHandler, JSX, MouseEventHandler } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import FormGroupCommon from "../FormGroupCommon";
import ErrorText from "./components/ErrorText";
import ListItemButtonStyled from "./components/ListItemButtonStyled";
import ListStyled from "./components/ListStyled";
import type { CheckGroupOption, InputCheckGroupProps, RHFCheckGroupProps } from "./types";

const InputCheckGroup = forwardRef<HTMLElement, InputCheckGroupProps>(
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
      (option: CheckGroupOption) => {
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

    const handleSelectOption = useCallback(
      (
        option: CheckGroupOption<AnyObject>,
        currentChecked: boolean
      ): MouseEventHandler<HTMLDivElement> =>
        (event) => {
          event?.stopPropagation?.();
          event?.preventDefault?.();
          // @ts-ignore
          event.target["value"] = option.value;
          // @ts-ignore
          event.target["checked"] = !currentChecked;
          handleOnchange(event);
        },
      [handleOnchange]
    );

    const $Options = useMemo(() => {
      if (!memoOption?.length) return null;
      return (
        <ListStyled disablePadding dense {...listProps}>
          {memoOption.map((option) => {
            const checked = isChecked(option);
            const disabled = !!option?.disabled;
            const handleClick = handleSelectOption(option, checked);
            const optionLabel = option?.label || option?.name || "";
            return (
              <ListItemButtonStyled
                {...optionProps}
                key={option.value}
                disabled={disabled}
                selected={checked}
                onClick={handleClick}
              >
                <ListItemAvatar>
                  <Checkbox
                    {...option.InputProps}
                    // @ts-ignore
                    error={`${!!error}`}
                    name={name}
                    value={option.value}
                    checked={checked}
                    aria-label={optionLabel}
                    title={optionLabel}
                    disabled={disabled}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={optionLabel}
                  primaryTypographyProps={{
                    component: Text,
                    maxlines: 10,
                    ["aria-label"]: optionLabel,
                    title: optionLabel,
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
      handleSelectOption,
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
  props: InputCheckGroupProps<T>
) => JSX.Element;

// @ts-ignore
InputCheckGroup.displayName = "InputCheckGroup";

function RHFCheckGroup<T extends AnyObject = AnyObject>(
  props: RHFCheckGroupProps<T>
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
      <InputCheckGroup
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

export { InputCheckGroup, RHFCheckGroup };

