import StyledTable from "./StyledTable";
import StyledTableBody from "./StyledTableBody";
import StyledTableBodyCell from "./StyledTableBodyCell";
import StyledTableBodyCellContent from "./StyledTableBodyCellContent";
import StyledTableBodyRow from "./StyledTableBodyRow";
import StyledTableContainer from "./StyledTableContainer";
import StyledTableHead from "./StyledTableHead";
import StyledTableHeadCell from "./StyledTableHeadCell";
import StyledTableHeadCellContent from "./StyledTableHeadCellContent";
import StyledTableHeadCellLabel from "./StyledTableHeadCellLabel";
import StyledTableHeadRow from "./StyledTableHeadRow";

const Slots = {
  Container: StyledTableContainer,
  Table: StyledTable,
  Head: StyledTableHead,
  HeadRow: StyledTableHeadRow,
  HeadCell: StyledTableHeadCell,
  HeadCellContent: StyledTableHeadCellContent,
  HeadCellLabel: StyledTableHeadCellLabel,
  Body: StyledTableBody,
  BodyRow: StyledTableBodyRow,
  BodyCell: StyledTableBodyCell,
  BodyCellContent: StyledTableBodyCellContent,
};

export default Slots;
