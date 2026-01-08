"use client";

import { alpha, styled } from "@mui/material";
import FormGroup, { FormGroupProps } from "@mui/material/FormGroup";
import type { FormLabelProps } from "@mui/material/FormLabel";
import FormLabel from "@mui/material/FormLabel";
import type { GridProps, GridSize } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import type { ResponsiveStyleValue } from "@mui/system";
import type { ComponentType, ReactNode, Ref } from "react";
import { forwardRef } from "react";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

export type FormControlSlot = {
  root: ComponentType<GridProps>;
  label: ComponentType<GridProps>;
  control: ComponentType<GridProps>;
  content: ComponentType<BoxProps>;
};

export type FormControlSlotProps = {
  root: Partial<GridProps>;
  label: Partial<GridProps>;
  control: Partial<GridProps>;
  content: Partial<BoxProps>;
};

export type FormControlProps = Omit<GridProps, "slot"> & {
  label?: ReactNode;
  error?: boolean;
  slot?: {
    root?: FormControlSlot["root"];
    label?: FormControlSlot["label"];
    control?: FormControlSlot["control"];
    content?: FormControlSlot["content"];
  };
  slotProps?: {
    label?: FormControlSlotProps["label"];
    control?: FormControlSlotProps["control"];
    content?: FormControlSlotProps["content"]
  };
};


const brand = {
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
};

const FormGroupStyled = styled(FormGroup)<FormGroupProps>(
  ({ theme }) => ({
    width: "100%",
    minHeight: "33.75px",
    padding: theme.spacing(0.25),
    color: (theme.vars || theme).palette.text.primary,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    backgroundColor: (theme.vars || theme).palette.background.default,
    ["&:hover"]: {
      borderColor: "hsl(220, 20%, 65%)",
    },

    ["&.Mui-focusVisible"]: {
      outline: `3px solid ${alpha(brand[500], 0.5)}`,
      outlineOffset: "2px",
      borderColor: brand[400],
    },
    ...theme.applyStyles("dark", {
      ["&.Mui-focusVisible"]: {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: "2px",
        borderColor: brand[400],
      },
    }),
  })
);
FormGroupStyled.displayName = "FormGroupStyled";

const FormLabelStyled = styled(FormLabel, {
  shouldForwardProp: (p) => p !== "data-error",
})<FormLabelProps & { ["data-error"]?: boolean }>(
  ({ theme, ["data-error"]: error = false }) => ({
    fontSize: "11px",
    fontWeight: 600,
    alignItems: "center",
    color: !error ? theme.palette.text.primary : theme.palette.error.main,
  })
) as ComponentType<FormLabelProps>;
FormLabelStyled.displayName = "FormLabelStyled";

export const FormControl = forwardRef<HTMLElement, FormControlProps>(
  ({ label, children, slotProps, slot, error = false, ...otherProps }, ref) => {
    const Root = slot?.root || (Grid as ComponentType<GridProps>);
    Root.displayName = "FormControl:Root";
    const Label = slot?.label || (Grid as ComponentType<GridProps>);
    Label.displayName = "FormControl:Label";
    const Control = slot?.control || (Grid as ComponentType<GridProps>);
    Control.displayName = "FormControl:Control";

    return (
      <Root
        component={FormGroupStyled}
        {...otherProps}
        container
        ref={ref as Ref<HTMLDivElement>}
      >
        {!label ? null : (
          <Label
            {...slotProps?.label}
            component={FormLabelStyled}
            container
            size={
              {
                ...(slotProps?.label?.size as object),
                xs: 12,
              } as ResponsiveStyleValue<GridSize>
            }
            data-error={error}
          >
            {label}
          </Label>
        )}
        <Control
          pt={1}
          {...slotProps?.control}
          container
          size={
            {
              ...(slotProps?.control?.size as object),
              xs: 12,
            } as ResponsiveStyleValue<GridSize>
          }
        >
          {!children ? null : <Box {...slotProps?.content}>{children}</Box>}
        </Control>
      </Root>
    );
  }
) as ComponentType<FormControlProps & { ref?: Ref<HTMLDivElement> }>;
FormControl.displayName = "FormControl";
