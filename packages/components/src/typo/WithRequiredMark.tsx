import type { ComponentType, ReactNode } from "react";
import { Fragment } from "react";

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
