"use client";

import { styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import type { Grid2Props as GridProps } from "@mui/material/Grid2";
import Grid from "@mui/material/Grid2";
import type { ComponentType, JSX, ReactNode } from "react";
import { forwardRef, useMemo } from "react";

const DefaultSlot = {
  Root: styled(Grid)<GridProps>({}) as (props: GridProps) => JSX.Element,
  Label: styled(Grid)<GridProps>({}) as (props: GridProps) => JSX.Element,
  Control: styled(Grid)<GridProps>({}) as (props: GridProps) => JSX.Element,
};

type SlotRoot = typeof DefaultSlot.Root | ComponentType<any>;

type SlotLabel = typeof DefaultSlot.Label | ComponentType<any>;

type SlotControl = typeof DefaultSlot.Control | ComponentType<any>;

type SlotLabelProps = Partial<Parameters<typeof DefaultSlot.Label>[0]>;

type SlotControlProps = Partial<Parameters<typeof DefaultSlot.Control>[0]>;

export type FormGroupCommonProps = Omit<GridProps, "slot"> & {
  label?: ReactNode;
  error?: boolean;
  slot?: {
    Root?: SlotRoot;
    Label?: SlotLabel;
    Control?: SlotControl;
  };
  slotProps?: {
    label?: SlotLabelProps;
    control?: SlotControlProps;
  };
};

const FormGroupCommon = forwardRef<HTMLElement, FormGroupCommonProps>(
  (
    {
      label,
      children,
      slotProps = {},
      slot = {},
      error = false,
      ...otherProps
    },
    ref
  ) => {
    const {
      Root = DefaultSlot.Root,
      Label = DefaultSlot.Label,
      Control = DefaultSlot.Control,
    } = slot;

    const slotLabelProps: SlotLabelProps = useMemo(
      () => ({
        xs: 12,
        fontSize: "11px",
        fontWeight: 600,
        alignItems: "center",
        ...(error
          ? {
              color: (theme) => theme.palette.error.main,
            }
          : {}),
        ...slotProps?.label,
      }),
      [slotProps?.label, error]
    );

    const slotControlProps: SlotControlProps = useMemo(
      () => ({
        xs: 12,
        pt: 1,
        ...slotProps?.control,
      }),
      [slotProps?.control]
    );

    return (
      <Root component={FormGroup} {...otherProps} ref={ref as any} container>
        {!label ? null : (
          <Label
            component={FormLabel}
            container
            {...slotLabelProps}
            {...{ item: true }}
          >
            {label}
          </Label>
        )}
        <Control container {...slotControlProps} {...{ item: true }}>
          {children}
        </Control>
      </Root>
    );
  }
);
FormGroupCommon.displayName = "FormGroupCommon";
export default FormGroupCommon;
