import VirtuosoMuiTable from "./components/VirtuosoMuiTable";
import VirtuosoMuiTableBody from "./components/VirtuosoMuiTableBody";
import VirtuosoMuiTableBodyEmpty from "./components/VirtuosoMuiTableBodyEmpty";
import VirtuosoMuiTableBodyRow from "./components/VirtuosoMuiTableBodyRow";
import VirtuosoMuiTableBodyRowContent from "./components/VirtuosoMuiTableBodyRowContent";
import VirtuosoMuiTableHead from "./components/VirtuosoMuiTableHead";
import VirtuosoMuiTableHeadRow from "./components/VirtuosoMuiTableHeadRow";
import VirtuosoScroller from "./components/VirtuosoScroller";
import type { Any, VirtuosoComponents } from "./types";

export const fixedHeaderContent = () => <VirtuosoMuiTableHeadRow />;

export const itemContent = <RowData extends Any = Any, ContextData extends Any = Any>(
  index: number,
  row: RowData,
  context: ContextData
) => (
  <VirtuosoMuiTableBodyRowContent index={index} data={row} context={context} />
);

export const components: VirtuosoComponents<Any, Any> = {
  Scroller: VirtuosoScroller,
  Table: VirtuosoMuiTable,
  TableHead: VirtuosoMuiTableHead,
  TableRow: VirtuosoMuiTableBodyRow as any,
  TableBody: VirtuosoMuiTableBody,
  EmptyPlaceholder: VirtuosoMuiTableBodyEmpty as any,
};