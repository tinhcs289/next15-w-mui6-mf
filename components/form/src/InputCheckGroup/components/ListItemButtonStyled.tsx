"use client";

import { styled } from "@mui/material";
import { listItemAvatarClasses } from "@mui/material/ListItemAvatar";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemButton from "@mui/material/ListItemButton";
import { listItemTextClasses } from "@mui/material/ListItemText";

const ListItemButtonStyled = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  padding: 0,
  background: theme.palette.background.paper,
  alignItems: "center",
  borderRadius: theme.spacing(0.5),
  boxShadow: theme.shadows[3],
  ":not(:last-child)": {
    marginBottom: theme.spacing(1),
  },
  [`.${listItemAvatarClasses.root}`]: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    minWidth: theme.spacing(5.25),
  },
  [`.${listItemTextClasses.root}`]: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1),
    position: "relative",
    "::after": {
      position: "absolute",
      content: "''",
      display: "block",
      left: 0,
      top: "50%",
      width: "1px",
      height: "80%",
      transform: "translateY(-50%)",
      background: theme.palette.grey[300],
    },
  },
}));
ListItemButtonStyled.displayName = "ListItemButtonStyled";
export default ListItemButtonStyled;