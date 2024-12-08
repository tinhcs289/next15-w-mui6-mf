"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { inputBaseClasses } from "@mui/material";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import type { ChangeEvent, ComponentType, ReactNode } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type {
  InputAttributes,
  NumberFormatValues,
  NumericFormatProps,
  SourceInfo,
} from "react-number-format";
import { NumericFormat } from "react-number-format";
import type { MuiSx } from "../../types/mui";
import type { RHFInputProps, RHFRenderInput } from "../../types/rhf";
import BoxTooltip from "../box/BoxTooltip";
import WithRequiredMark from "../typo/WithRequiredMark";
import type { FormGroupCommonProps } from "./FormGroupCommon";
import FormGroupCommon from "./FormGroupCommon";
import type { InputErrorProps } from "./InputError";
import InputError from "./InputError";

type InputNumberProps = TextFieldProps & NumericFormatProps;

const isAllowedDefault = (values: NumberFormatValues) =>
  values?.value?.length <= 16 || values?.value === "";

function InputNumber({
  isAllowed,
  onValueChange,
  onChange,
  ...otherProps
}: InputNumberProps) {
  const handleValueChangeDelay = useMemo(() => {
    return debounce((values: NumberFormatValues, sourceInfo: SourceInfo) => {
      onValueChange?.(values, sourceInfo);
    }, 300);
  }, [onValueChange]);

  const handleChangeDelay = useMemo(() => {
    return debounce((e: ChangeEvent<any>) => {
      onChange?.(e);
    }, 300);
  }, [onChange]);

  const isAllowedMemo = useCallback(
    (values: NumberFormatValues) => {
      if (typeof isAllowed !== "function") return isAllowedDefault(values);
      return isAllowedDefault(values) && isAllowed(values) === true;
    },
    [isAllowed]
  );
  return (
    <NumericFormat
      customInput={TextField as ComponentType<InputAttributes>}
      allowNegative
      allowLeadingZeros={false}
      decimalSeparator="."
      thousandSeparator=","
      isAllowed={isAllowedMemo}
      {...otherProps}
      onChange={handleChangeDelay}
      onValueChange={handleValueChangeDelay}
    />
  );
}

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

type NumberAdjustableProps = Omit<
  FormGroupCommonProps,
  "slotProps" | "onChange" | "value" | "name"
> & {
  placeholder?: string;
  name?: string;
  step?: number;
  min?: number | null;
  max?: number | null;
  iconDecrease?: ReactNode;
  labelDecrease?: string;
  iconIncrease?: ReactNode;
  labelIncrease?: string;
  slotProps?: FormGroupCommonProps["slotProps"] & {
    error?: Partial<InputErrorProps>;
    increaseGrid?: Partial<GridProps>;
    increaseButton?: Partial<IconButtonProps>;
    decreaseGrid?: Partial<GridProps>;
    decreaseButton?: Partial<IconButtonProps>;
    inputGrid?: Partial<GridProps>;
    input?: Partial<
      Omit<
        InputNumberProps,
        "inputRef" | "placeholder" | "onChange" | "onValueChange"
      >
    >;
  };
  inputRef?: InputNumberProps["inputRef"];
  value?: number | null;
  onChange?: (value?: number | null) => void;
  required?: boolean;
  error?: boolean;
  errorText?: ReactNode;
};

const NumberAdjustableBase = forwardRef<HTMLElement, NumberAdjustableProps>(
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
        ref={ref}
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
            <BoxTooltip title={labelDecrease}>
              <IconButton
                color="primary"
                {...decreaseButtonProps}
                onClick={handleDecrease}
                disabled={shouldDisableDecrease}
              >
                {iconDecrease || <RemoveIcon />}
              </IconButton>
            </BoxTooltip>
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
            <BoxTooltip title={labelIncrease}>
              <IconButton
                color="primary"
                {...increaseButtonProps}
                onClick={handleIncrease}
                disabled={shouldDisableIncrease}
              >
                {iconIncrease || <AddIcon />}
              </IconButton>
            </BoxTooltip>
          </Grid>
        </Grid>
      </FormGroupCommon>
    );
  }
);
NumberAdjustableBase.displayName = "NumberAdjustableBase";

type RHFNumberAdjustableProps = RHFInputProps &
  Omit<
    NumberAdjustableProps,
    | "error"
    | "errorText"
    | "onChange"
    | "onValueChange"
    | "value"
    | "name"
    | "required"
  >;

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
      <NumberAdjustable
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
}

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
  P extends NumberAdjustableProps = NumberAdjustableProps,
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

const NumberAdjustable = withCommonStyle(
  NumberAdjustableBase as any,
  "NumberAdjustable"
) as ComponentType<NumberAdjustableProps>;

const RHFNumberAdjustable = withCommonStyle(
  RHFNumberAdjustableBase as any,
  "RHFNumberAdjustable"
) as ComponentType<RHFNumberAdjustableProps>;

export default NumberAdjustable;
export { NumberAdjustableBase, RHFNumberAdjustable, RHFNumberAdjustableBase };
export type { NumberAdjustableProps, RHFNumberAdjustableProps };
