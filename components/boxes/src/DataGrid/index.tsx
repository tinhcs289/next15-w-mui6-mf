import Box from "@mui/material/Box";

function DataGrid() {
  return (
    <Box role="grid">
      <Box role="row">
        <Box role="columnheader">HEADER</Box>
        <Box role="columnheader">HEADER</Box>
        <Box role="columnheader">HEADER</Box>
        <Box role="columnheader">HEADER</Box>
        <Box role="columnheader">HEADER</Box>
      </Box>

      <Box role="row">
        <Box role="gridcell">CELL</Box>
        <Box role="gridcell">CELL</Box>
        <Box role="gridcell">CELL</Box>
        <Box role="gridcell">CELL</Box>
        <Box role="gridcell">CELL</Box>
      </Box>
    </Box>
  )
}