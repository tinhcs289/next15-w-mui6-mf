import type { ComponentType, ReactNode } from "react";

export type WithRequiredMarkProps = {
  children?: ReactNode;
  required?: boolean;
  mark?: ReactNode;
  MarkComponent?: ComponentType<any>;
  markComponentProps?: { [x: string]: any };
  Component?: ComponentType<any>;
  componentProps?: { [x: string]: any };
  spaces?: number;
};
