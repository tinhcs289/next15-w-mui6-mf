import type { ComponentType, ReactNode } from "react";
import { Fragment } from "react";
import Spaces from "./Spaces";

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

export default function WithIcon({
  children,
  Component = Fragment,
  componentProps,
  StartIcon = Fragment,
  startIconProps,
  startIconSpaces,
  EndIcon = Fragment,
  endIconProps,
  endIconSpaces,
}: WithIconProps) {
  return (
    <Component {...componentProps}>
      {!!StartIcon ? (
        <>
          <StartIcon {...startIconProps} />
          <Spaces value={startIconSpaces} />
        </>
      ) : null}
      {children}
      {!!EndIcon ? (
        <>
          <Spaces value={endIconSpaces} />
          <EndIcon {...endIconProps} />
        </>
      ) : null}
    </Component>
  );
}
