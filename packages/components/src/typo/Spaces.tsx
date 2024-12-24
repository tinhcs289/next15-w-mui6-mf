import { Fragment } from "react";

export type SpacesProps = {
  value?: number;
};

export default function Spaces({ value = 0 }: SpacesProps) {
  return !value ? null : (
    <>
      {Object.keys([...Array(value)]).map((s) => (
        <Fragment key={s}>&nbsp;</Fragment>
      ))}
    </>
  );
}
