import { Fragment } from "react";
import type { SpacesProps } from "./types";

export default function Spaces({ value = 0 }: SpacesProps) {
  return !value ? null : (
    <>
      {Object.keys([...Array(value)]).map((s) => (
        <Fragment key={s}>&nbsp;</Fragment>
      ))}
    </>
  );
};