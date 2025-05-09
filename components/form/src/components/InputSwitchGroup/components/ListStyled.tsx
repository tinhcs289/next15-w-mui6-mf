"use client";

import { styled } from "@mui/material";
import List from "@mui/material/List";
import type { ListProps } from "@mui/material/List";

const ListStyled = styled(List)<ListProps>(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(0.75),
  // maxHeight: "400px",
  // overflowY: "auto",
  borderRadius: theme.spacing(0.5),
  border: `1px solid ${theme.palette.grey[300]}`,
}));
ListStyled.displayName = "ListStyled";

export default ListStyled;
