"use client";

import { Table, defineColumn } from "@repo/components/table";
import { GUID } from "@repo/utils/string/guid";

type RowData = {
  useId: string;
  name: string;
  description: string;
};

const data: RowData[] = Array.from({ length: 10000 }, (_, index) => ({
  useId: GUID(),
  name: `User ${index}`,
  description: `${index} description`,
}));

const columns = [
  defineColumn<RowData>({ field: "useId", head: "ID" }),
  defineColumn<RowData>({ field: "name", head: "Name" }),
  defineColumn<RowData>({ field: "description", head: "Description" }),
];

export default function DemoTable() {
  return (
    <>
      <Table
        rows={data}
        columns={columns}
        sx={{ height: "500px" }}
        columnsReOrder
        slotProps={{
          table: {
            size: "small",
            padding: "checkbox",
          },
        }}
        emptyDisplay="No data"
      />
    </>
  );
}
