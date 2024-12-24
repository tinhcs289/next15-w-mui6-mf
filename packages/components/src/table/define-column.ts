import type { Any, ColumnDef } from "./base.types";

function createRandomGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function defineColumn<RowData extends Any = Any>(
  colDef: Omit<ColumnDef<RowData>, "id">
) {
  return { ...colDef, id: createRandomGUID() } as ColumnDef<RowData>;
}
