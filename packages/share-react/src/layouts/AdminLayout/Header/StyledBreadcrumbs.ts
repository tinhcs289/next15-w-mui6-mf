"use client";

import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import { styled } from '@mui/material/styles';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    // @ts-ignore
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default StyledBreadcrumbs;