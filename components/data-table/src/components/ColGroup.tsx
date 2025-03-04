"use client";

import { useGetState } from "../context";

export default function ColGroup() {
  const visibilities = useGetState((s) => s?.columnVisibilities);

  return (
    <colgroup>
      {visibilities?.map?.((vis) => (
        <col width={vis?.width} span={1} key={vis.id} />
      ))}
    </colgroup>
  );
}