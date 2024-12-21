"use client";

import { useGetState } from "./context";
import type { Slot, SlotProps } from "./styled-components";
import S from "./styled-components";

function HeaderContent({
  component: Component = S.HeadRow,
  props,
}: {
  component?: Slot["HeadRow"];
  props?: Partial<SlotProps["headRow"]>;
}) {
  const colDefs = useGetState((s) => s?.colDefs);
  return (
    <Component {...props}>
      {!colDefs?.length
        ? null
        : colDefs?.map?.(({ _key, field, head, slots = {}, slotProps }, i) => {
            const inner = head || null;
            const Cell = slots?.headCell || S.HeadCell;
            return (
              <Cell key={_key} variant="head" {...slotProps?.headCell}>
                {inner}
              </Cell>
            );
          })}
    </Component>
  );
}

export function fixedHeaderContent({
  component,
  props,
}: {
  component?: Slot["HeadRow"];
  props?: Partial<SlotProps["headRow"]>;
}) {
  return () => {
    return <HeaderContent component={component} props={props} />;
  };
}
