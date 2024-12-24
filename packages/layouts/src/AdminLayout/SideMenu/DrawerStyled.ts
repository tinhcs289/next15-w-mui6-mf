"use client";

import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerStyled = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}) as typeof MuiDrawer;

export default DrawerStyled; 