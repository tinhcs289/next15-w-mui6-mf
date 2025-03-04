import { Fragment } from "react";
import type { WithRequiredMarkProps } from "./types";

export default function WithRequiredMark({
  children,
  required,
  mark = "*",
  MarkComponent = Fragment,
  markComponentProps,
  Component = Fragment,
  componentProps,
  spaces = 1,
}: WithRequiredMarkProps) {
  if (!children) return null;
  return (
    <Component {...componentProps}>
      {children}
      {!spaces ? null : (
        <>
          {Object.keys([...Array(spaces)]).map((s) => (
            <Fragment key={s}>&nbsp;</Fragment>
          ))}
        </>
      )}
      {!!required ? (
        <MarkComponent {...markComponentProps}>{mark}</MarkComponent>
      ) : null}
    </Component>
  );
}
