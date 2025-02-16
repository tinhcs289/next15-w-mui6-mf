"use client";

import type { DrawerProps } from "@mui/material/Drawer";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import type { ComponentType } from "react";
import { ASIDE_WIDTH } from "../constants";

const WIDTH = ASIDE_WIDTH;

const DrawerStyled = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  width: WIDTH,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: WIDTH,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
  },
})) as ComponentType<DrawerProps>;
export default DrawerStyled;