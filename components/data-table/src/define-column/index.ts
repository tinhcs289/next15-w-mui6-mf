import { defineBaseColumn } from "./column-base";
import { defineCurrencyColumn } from "./column-currency";
import { defineImageColumn } from "./column-image";
import { defineNumberColumn } from "./column-number";
import { defineNumberCountColumn } from "./column-number-count";
import { definedRowIndexColumn } from "./column-row-index";
import { defineSelectColumn } from "./column-select";

export const column = {
  base: defineBaseColumn,
  select: defineSelectColumn,
  rowIndex: definedRowIndexColumn,
  currency: defineCurrencyColumn,
  number: defineNumberColumn,
  nunberCount: defineNumberCountColumn,
  image: defineImageColumn,
};
