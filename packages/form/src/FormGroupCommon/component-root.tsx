import type { Grid2Props as GridProps, GridSize } from "@mui/material/Grid2";
import Grid from "@mui/material/Grid2";
import type { ResponsiveStyleValue } from "@mui/system";
import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import FormGroupStyled from "./components/FormGroupStyled";
import FormLabelStyled from "./components/FormLabelStyled";
import type { FormGroupCommonProps } from "./types";

export const FormGroupCommon = forwardRef<HTMLElement, FormGroupCommonProps>(
  ({ label, children, slotProps, slot, error = false, ...otherProps }, ref) => {
    const Root = slot?.root || (Grid as ComponentType<GridProps>);
    Root.displayName = "FormGroupCommon:Root";
    const Label = slot?.label || (Grid as ComponentType<GridProps>);
    Label.displayName = "FormGroupCommon:Label";
    const Control = slot?.control || (Grid as ComponentType<GridProps>);
    Control.displayName = "FormGroupCommon:Control";

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
          {children}
        </Control>
      </Root>
    );
  }
) as ComponentType<FormGroupCommonProps & { ref?: Ref<HTMLDivElement> }>;
FormGroupCommon.displayName = "FormGroupCommon";
