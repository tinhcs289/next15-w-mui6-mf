import { Fragment } from "react";
import Spaces from "../Spaces";
import type { WithIconProps } from "./types";

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
