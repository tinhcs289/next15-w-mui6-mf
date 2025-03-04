export { ComponentType, ReactNode } from "react";

export type WithIconProps = {
  children?: ReactNode;
  required?: boolean;
  mark?: ReactNode;
  StartIcon?: ComponentType<any>;
  startIconProps?: { [x: string]: any };
  startIconSpaces?: number;
  EndIcon?: ComponentType<any>;
  endIconProps?: { [x: string]: any };
  endIconSpaces?: number;
  Component?: ComponentType<any>;
  componentProps?: { [x: string]: any };
};
