"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { inputBaseClasses } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { MuiSx } from "@shared/types-react/mui";
import type { RHFRenderInput } from "@shared/types-react/rhf";
import WithRequiredMark from "@shared/typo/WithRequiredMark";
import type { ComponentType } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import FormGroupCommon from "../FormGroupCommon";
import ErrorText from "./components/ErrorText";
import InputNumber from "./components/InputNumber";
import type { InputNumberProps, InputNumberAdjustableProps, RHFNumberAdjustableProps } from "./types";

const InputNumberAdjustableBase = forwardRef<
  HTMLElement,
  InputNumberAdjustableProps
>(
  (
    {
      label,
      placeholder,
      name,
      value,
      min = 0,
      max,
      step = 1,
      onChange,
      iconDecrease,
      labelDecrease = "",
      iconIncrease,
      labelIncrease = "",
      slotProps = {},
      inputRef,
      required = false,
      error = false,
      errorText = "",
      ...otherProps
    },
    ref
  ) => {
    const {
      increaseGrid: increaseGridProps,
      increaseButton: increaseButtonProps,
      decreaseGrid: decreaseGridProps,
      decreaseButton: decreaseButtonProps,
      inputGrid: inputGridProps,
      input: inputProps,
      error: errorProps,
      ...otherSlotProps
    } = slotProps;

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
          <WithRequiredMark required={required}>{label}</WithRequiredMark>
          {$Error}
        </>
      );
      return;
    }, [label, required, $Error]);

    const shouldDisableIncrease = useMemo(
      () =>
        typeof value === "number" && typeof max === "number" && value >= max,
      [value, max]
    );

    const handleIncrease: Required<IconButtonProps>["onClick"] = useCallback(
      (e) => {
        e?.stopPropagation?.();
        e?.preventDefault?.();
        const newValue = (value || 0) + step;
        if (typeof max === "number" && newValue > max) return;
        onChange?.(newValue);
      },
      [value, step, max, onChange]
    );

    const shouldDisableDecrease = useMemo(
      () =>
        typeof value === "number" && typeof min === "number" && value <= min,
      [value, min]
    );

    const handleDecrease: Required<IconButtonProps>["onClick"] = useCallback(
      (e) => {
        e?.stopPropagation?.();
        e?.preventDefault?.();
        const newValue = (value || 0) - step;
        if (typeof min === "number" && newValue < min) return;
        onChange?.(newValue);
      },
      [value, step, min, onChange]
    );

    const handleInputChange: Required<InputNumberProps>["onValueChange"] =
      useCallback(
        ({ floatValue }) => {
          onChange?.(typeof floatValue === "number" ? floatValue : null);
        },
        [onChange]
      );

    return (
      <FormGroupCommon
        label={$Label}
        tabIndex={1}
        {...otherProps}
        slotProps={{
          ...otherSlotProps,
        }}
        ref={ref as any}
        error={error}
      >
        <Grid container width="100%" alignItems="center">
          <Grid
            item
            xs={1}
            container
            justifyContent="center"
            {...decreaseGridProps}
          >
            <Tooltip title={labelDecrease}>
              <IconButton
                color="primary"
                {...decreaseButtonProps}
                onClick={handleDecrease}
                disabled={shouldDisableDecrease}
              >
                {iconDecrease || <RemoveIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={10} container px={1} {...inputGridProps}>
            <InputNumber
              fullWidth
              // @ts-ignore
              size="small"
              {...inputProps}
              onValueChange={handleInputChange}
              name={name}
              value={value}
              inputRef={inputRef}
              placeholder={placeholder}
            />
          </Grid>
          <Grid
            item
            xs={1}
            container
            justifyContent="center"
            {...increaseGridProps}
          >
            <Tooltip title={labelIncrease}>
              <IconButton
                color="primary"
                {...increaseButtonProps}
                onClick={handleIncrease}
                disabled={shouldDisableIncrease}
              >
                {iconIncrease || <AddIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </FormGroupCommon>
    );
  }
) as ComponentType<InputNumberAdjustableProps>;
InputNumberAdjustableBase.displayName = "InputNumberAdjustableBase";

function RHFNumberAdjustableBase(props: RHFNumberAdjustableProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister = false,
    ...inputProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, ref },
      fieldState: { invalid, error },
    }) => (
      <InputNumberAdjustableBase
        name={name}
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
    [name, rules?.required, inputProps, defaultValue]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue ?? undefined}
      render={renderInput}
    />
  );
};

const controlSx: MuiSx = {
  padding: (theme) => theme.spacing(0.5),
  borderRadius: (theme) => theme.spacing(0.5),
  border: (theme) => `1px solid ${theme.palette.grey[300]}`,
  [`.${inputBaseClasses.root}`]: {
    background: (theme) => theme.palette.background.paper,
    "& > input": {
      textAlign: "center",
    },
  },
};

function withCommonStyle<
  P extends InputNumberAdjustableProps = InputNumberAdjustableProps,
>(WrappedComponent: ComponentType<P>, displayName?: string) {
  const CompositedComponent = forwardRef<unknown, P>(
    (
      {
        labelDecrease = "Giảm",
        labelIncrease = "Tăng",
        slotProps = {},
        ...otherProps
      },
      ref
    ) => {
      const { control: controlProps, ...otherSlotProps } = slotProps;
      return (
        <WrappedComponent
          labelDecrease={labelDecrease}
          labelIncrease={labelIncrease}
          slotProps={{
            ...otherSlotProps,
            control: {
              ...controlProps,
              sx: { ...controlSx, ...controlProps?.sx },
            },
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

const InputNumberAdjustable = withCommonStyle(
  InputNumberAdjustableBase as any,
  "InputNumberAdjustable"
) as ComponentType<InputNumberAdjustableProps>;

const RHFNumberAdjustable = withCommonStyle(
  RHFNumberAdjustableBase as any,
  "RHFNumberAdjustable"
) as ComponentType<RHFNumberAdjustableProps>;

export { InputNumberAdjustable, RHFNumberAdjustable };

